import React from 'react';
import { PostsList } from "../features/posts/PostsList";
import { AppNavbar } from './Navbar';
// import { useAuth } from '../features/hooks/useAuth';
import { loadUser } from '../app/localStorage'
import { MainMenu } from './Menu';
import { SideBar } from './SideBar';
import { Layout, Row, Col } from 'antd';
import { Spoiler } from './Spoiler';
import { useAuth } from '../features/auth/authProvider';





export const Home = () => {

    const { Header, Content } = Layout;
    
    const [logged] = useAuth();

    const currentUser = loadUser();

    let spoiler;
    logged ? spoiler =  null : spoiler = <Spoiler />;
    



    return (
        <>
            <Layout>
                <Header>
                    <AppNavbar currentUser={currentUser} />
                    {spoiler}
                </Header>
                <Content>
                    <Row>
                        <Col span={4}></Col>
                        <Col span={10}>
                            <MainMenu />
                            <PostsList />
                        </Col>
                        <Col span={10}><SideBar/></Col>
                    </Row>
                    </Content>
            </Layout>


            {/* <Login /> */}
            {/* {console.log('user from store ',user) } */}
            {
                // console.log('State from store ', state)
            }

            {/* <PostScrollList /> */}




        </>
    )
};