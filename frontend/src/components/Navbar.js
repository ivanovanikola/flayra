
import { Navbar, Container, Nav, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { FlayraLogo } from './Logo';
import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import { HouseIcon } from './HouseIcon';
import { Search } from '../features/search/Search';
import { CurrentUserAvatar } from '../features/user/Avatar';
import { logout, useAuth } from '../features/auth/authProvider';
import { Layout, Menu, Row, Col, Divider, Descriptions, Space, Image, Tooltip, Typography, Affix} from 'antd';
import { Link } from 'react-router-dom';



export const AppNavbar = ({ currentUser }) => {

    const [logged] = useAuth();

    let content;
    logged ? content = <CustomNavbar currentUser={currentUser} /> : content = <CommonNavbar />;
    return (<>{content}</>);
}

// TODO: Написать обработчики ошибок и исключения


export const CommonNavbar = () => {
    const [navbar, setNavbar] = useState(false);

    const { Header } = Layout;

    const changeBackground = () => {
        if (window.scrollY >= 505) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }
    window.addEventListener('scroll', changeBackground)
    return (


      
        <>
            <Header
                className={navbar ? 'navbar active' : 'navbar'}
                style={{ position: 'fixed', zIndex: 1, width: '100%', padding:0}}
            >
                
                    <Col flex="auto" ></Col>
                    <Col flex="991px" >
                        <Row >
                            <Col xs={4} >
                                <Link to="/">
                                    <FlayraLogo id={navbar ? 'flayraLogoDark' : 'flayraLogoLight'} />
                                </Link>
                            </Col>
                            <Col xs={20} >
                                <Row justify="end" >
                                <Space size="large" >
                                    <Typography.Link> <Link style={{padding: 0}} className={navbar ? 'navbar-text active' : 'navbar-text'} to="/mission">
                                        Миссия Флайры
                                    </Link>
                                    </Typography.Link>
                                    <Typography.Link>
                                        <Link style={{padding: 0}} className={navbar ? 'navbar-text active' : 'navbar-text'} to="/beauthor">
                                            Стать автором
                                        </Link>
                                    </Typography.Link>
                                    <Typography.Link><Link style={{padding: 0}} className="navbar-tex-login" to="/beauthor">
                                        Войти
                                    </Link>
                                    </Typography.Link>
                                </Space>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col flex="auto"></Col>
            

         
        {/* <Menu theme="dark" mode="horizontal">
                <Menu.Item key="1">
                    <Link className={navbar ? 'navbar-text active' : 'navbar-text'} to="/mission">
                    Миссия Флайры
                    </Link>
                </Menu.Item>

                <Menu.Item key="2">
                    
                <Link className={navbar ? 'navbar-text active' : 'navbar-text'} to="/beauthor">
                    Стать автором
                </Link>                   
                    </Menu.Item>
                <Menu.Item key="3">
                 <Link className="navbar-tex-login" to="/beauthor">
                 Войти
                 </Link>  
                    </Menu.Item>
            </Menu> */}
      </Header>
{/*       
    
            <Navbar className={navbar ? 'navbar active' : 'navbar'} expand="md" fixed="top">
                <div >
                    <Navbar.Brand href="/">
                        < FlayraLogo id={navbar ? 'flayraLogoDark' : 'flayraLogoLight'} />
                    </Navbar.Brand>
                    <Nav className="justify-content-end" activeKey="/home">
                        <Nav.Item className="d-none d-lg-block" >
                            <Nav.Link className={navbar ? 'navbar-text active' : 'navbar-text'} href="/mission">Миссия Флайры</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="d-none d-lg-block">
                            <Nav.Link className={navbar ? 'navbar-text active' : 'navbar-text'} href="/beauthor">Стать автором</Nav.Link>
                        </Nav.Item>
                        <Nav.Item >
                            <Nav.Link className="navbar-tex-login" href="/login">Войти</Nav.Link>
                        </Nav.Item>
                    </Nav> */}
                {/* </div> */}
            {/* </Navbar> */}
            {/* <Stack className="navbar-stack">
                <Container className="navbar-stack-container">
                    <Row>
                        <Col xs={12} >
                            <Row>
                                <Col>
                                    <IsMobile />
                                    <h3 className="navbar-stack-container"> Стань флайрой - пиши, читай и общайся.</h3>
                                    <Button size='lg' className="navbar-stack-btn" href="/login"   >
                                        Начать
                                    </Button>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Stack> */}
        </>
    )
}

export const CustomNavbar = ({ currentUser }) => {


    const { push } = useHistory();

    const onLogOut = () => {
        logout();
        push("/");
    };

return (

    <>
        <Navbar className="custom-navbar" expand="md" fixed="top">
            <Container >
                <Navbar.Brand href="/">
                    < FlayraLogo id='flayraLogoDark' />
                </Navbar.Brand>
                <Nav className="justify-content-end" activeKey="/home">
                    <Search />
                    <Button className="custom-navbar btn"
                    >
                        <HouseIcon
                            href="/"
                        />
                    </Button>
                    <OverlayTrigger
                        trigger={["focus"]}
                        rootCloseEvent="click"
                        key="bottom"
                        placement="bottom"
                        overlay={
                            <Popover id={`popover-positioned-bottom`}>
                                <Popover.Header>
                                    {currentUser.user.author.name}{' '}{currentUser.user.author.surname}
                                </Popover.Header>
                                <Popover.Body>
                                    <Row>
                                        <Button
                                            className="custom-navbar btn"
                                            onClick={onLogOut} >
                                            Выйти
                                        </Button>
                                    </Row>
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <Button
                            onClick={(e) => { e.target.focus() }}
                            className="custom-navbar btn"

                        >
                           <CurrentUserAvatar currentUser={currentUser} />
                        </Button>


                    </OverlayTrigger>



                </Nav>

            </Container>
        </Navbar>

    </>

)

}


// // //old 
// // let IsCurrentUser = () => {

//     const history = useHistory();
//     const dispatch = useDispatch();

//     const onLogOut = () => {
//         removeToken();
//         dispatch(clearCredentials());
//         history.push("/");
//     };


//     let content;

//     isToken() ? content = (
        // <>
        //     <Dropdown className="d-inline mx-2" >
        //         <Dropdown.Toggle id="dropdown-autoclose-true" className="navbar-dropdown">
        //             Аккаунт: 
        //             <CurrentUser />
        //         </Dropdown.Toggle>
        //         <Dropdown.Menu>
        //             <Dropdown.Item href="#"
        //             >Аккаунт
        //             </Dropdown.Item>
        //             <Dropdown.Item href="#"
        //             >Меню
        //             </Dropdown.Item>
        //             <Dropdown.Item href="#" onClick={onLogOut}
        //             >Выйти
        //             </Dropdown.Item>
        //         </Dropdown.Menu>
        //     </Dropdown>
        // </>

//     ) : content = (
//         <Nav.Link className="navbar-tex-login" href="/login">Войти</Nav.Link>
//     );
//     return (
//         <>{content}</>
//     );
// };



//