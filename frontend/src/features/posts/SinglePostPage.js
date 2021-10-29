import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGetPostQuery } from '../api/apiSlice'
import { Drawer, Layout, Row, Col, Divider, Space, Image, Tooltip, Typography, Affix, Alert, Popover, Button, Avatar, Breadcrumb, Menu, Pagination, Carousel } from 'antd';
import {CommentOutlined, HeartOutlined, MessageOutlined, UploadOutlined, TwitterOutlined, LinkOutlined, LoadingOutlined, SearchOutlined, HomeOutlined, UserOutlined, MenuOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { IsPostImg } from './isPostImg'
import ReactMarkdown from 'react-markdown'
import { FlayraLogo } from '../../components/Logo';
import { useHistory } from "react-router-dom";
import { Search } from '../../features/search/Search';
import { logout, useAuth } from '../../features/auth/authProvider';
import { loadUser } from '../../app/localStorage'
import { CurrentUserAvatar } from '../user/Avatar';
import { LastPublish } from '../../components/TimeAgo';
import { useGetModsQuery } from '../api/apiSlice'
import { CustomSideBar } from '../../comments/Comments';



export const Navbar = ({ currentUser, mod }) => {

  let content;
  if (currentUser) {
    content = <CustomNavbar currentUser={currentUser} mod={mod} />
  } else {
    content = <CommonNavbar mod={mod} />;
  };
  return (<>{content}</>);
};

// TODO: 
// 1. Написать обработчики ошибок и исключения.
// 2. Добавить кастомный спинер.

export const CommonNavbar = () => {

  const [navbar, setNavbar] = useState(false);
  const { Header } = Layout;

  const changeBackground = () => {
    if (window.scrollY >= 108) {
      setNavbar(true);
    } else {
      setNavbar(false);
    };
  };
  window.addEventListener('scroll', changeBackground);

  return (
    <Header
      className={navbar ? 'navbar active' : 'navbar'}
      style={{ position: 'fixed', zIndex: 1, width: '100%', padding: 0 }}
    >
      <Col flex="auto" ></Col>
      <Col flex="992px" >
        <Row >
          <Col xs={4} >
            <Link to="/">
              <FlayraLogo id={navbar ? 'flayraLogoDark' : 'flayraLogoLight'} />
            </Link>
          </Col>
          <Col xs={20} >
            <Row justify="end" >
              <Space size="large" >
                <Typography.Link style={{ padding: 0 }} className={navbar ? 'navbar-text active' : 'navbar-text'} href="/mission">
                  Миссия Флайры
                </Typography.Link>
                <Typography.Link style={{ padding: 0 }} className={navbar ? 'navbar-text active' : 'navbar-text'} href="/beauthor">
                  Стать автором
                </Typography.Link>
                <Typography.Link style={{ padding: 0 }} className="navbar-tex-login" href="/login">
                  Войти
                </Typography.Link>
              </Space>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col flex="auto"></Col>
    </Header>
  );
};

export const CustomNavbar = ({ currentUser, mod }) => {

  const { Header } = Layout;
  const { Title, Paragraph, Text } = Typography;
  const { push } = useHistory();
  const onLogOut = () => {
    logout();
    push("/");
  };
  const userName = currentUser.user.author.name;
  const userSurname = currentUser.user.author.surname;
  const userEmail = currentUser.user.email;

  let userInfo = (
    <>
      <div>
        {userName}{' '}{userSurname}{' '}{userEmail}
      </div>
      <Button
        className="custom-navbar btn"
        onClick={onLogOut} >
        Выйти
      </Button>
    </>
  );

  return (

    <Header
      className="custom-navbar"
      style={{ position: 'fixed', zIndex: 1, width: '100%', padding: 0 }}
    >
      <Row >
        <Col flex="auto"></Col>
        <Col flex="992px" >
          <Row>
            <Col xs={6} >
              <Space size={2} align="end">
                <Link to="/">
                  <FlayraLogo id='flayraLogoDark' />
                </Link>
                <Text style={{ margin: 0 }}>
                  <Link style={{ color: '#00040D', textDecoration: 'none' }} to={`/mods/${mod}`}>
                    {mod}
                  </Link>
                </Text>
              </Space>
            </Col>
            <Col xs={18}>
              <Row justify="end" align="bottom">

                <Space size={0} className="custom-navbar-btn-space">
                  <Search />
                  <Button className="custom-navbar-btn custom-navbar-btn-home" icon={<HomeOutlined />} href="/" size="large" />
                  <div style={{ clear: 'both', whiteSpace: 'nowrap' }}>
                    <Popover
                      placement="bottom" title={`Профиль:`}
                      content={userInfo}
                      trigger="click"
                    >
                      <Button className="custom-navbar-btn custom-navbar-btn-avatar ">
                        <CurrentUserAvatar currentUser={currentUser} width={32} height={32} />


                      </Button>
                    </Popover>
                  </div>
                </Space>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col flex="auto" ></Col>
      </Row>
    </Header>
  );
};
export const SinglePostPage = ({ match, menu }) => {

  const { slug } = match.params;

  const [logged] = useAuth();
  const currentUser = logged ? loadUser() : null;

  const { data: post, isFetching, isSuccess, isError, error } = useGetPostQuery(slug)

  const [container, setContainer] = useState(null);

  const { Header, Footer, Sider, Content } = Layout;
  const { Title, Paragraph, Text } = Typography;

  const { data: mods = [] } = useGetModsQuery()



  //ScrolledMenu
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  useEffect(() => {
    if (
      scrl.current &&
      scrl?.current?.scrollWidth === scrl?.current?.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
    return () => { };
  }, [scrl?.current?.scrollWidth, scrl?.current?.offsetWidth]);
  
  //  Sidebar
  const [visible, setVisible] = useState(false);
    
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  

  let content
  if (isFetching) {
    content = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  } else if (isSuccess) {

    //Twitter
    let tweetContent = post.title + ': ' + post.description
    let tweetUrl = `${window.location.href}`
    let twitterUrl = `https://twitter.com/intent/tweet?&url=${tweetUrl}&text=${tweetContent}&via=flayra&lang=ru`

    let icon;
    if (post.author.picture === null) {
      icon = <UserOutlined />;
    } else {
      const imageUrl = post.author.picture.formats.small.url;
      icon = <Image
        preview={false}
        src={`${process.env.REACT_APP_BACKEND_URL}${imageUrl}`} />;
  };

    // TODO: Сделать версию для слабовидящих

    content = (
      <Layout hasSider={true}>
        <Navbar currentUser={currentUser} mod={post.mod.name} />
        <Content style={{ marginTop: 65, backgroundColor: '#f0f2f5' }}>
          <Row style={{ minHeight: 56 }}>
            <Col flex="auto"></Col>
            <Col flex="992px"
              style={{
                flexShrink: 0,
                overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'clip'
              }}
            >
              <Row style={{ paddingTop: 16, backgroundColor: '#fff' }}>
                <Col flex="auto" style={{ marginLeft: 16 }}>
                  <Button className="scloll-menu-btn" icon={<MenuOutlined className="scloll-menu-icon" />} size="small" >
                    Меню
                  </Button>
                </Col>
                <Col flex="auto">
                  <Divider className="scloll-menu-divider" type="vertical" dashed={true} />
                  {scrollX !== 0 && (

                    <Button className="scloll-menu-btn" icon={<LeftOutlined />} onClick={() => slide(-50)} size="small" />
                  )}
                </Col>
                <Col xs={20}>
                  <ul className="scloll-menu" ref={scrl} onScroll={scrollCheck}>
                    <li className="scloll-menu">
                      <Link to={`/`} className="scloll-menu">
                        <Space size='small'>
                          <Text>Главная</Text>
                          <RightOutlined className="scloll-menu-icon-small" />
                        </Space>
                      </Link>
                    </li>
                    <li className="scloll-menu">
                      <Space>
                        <Link to={`/mods/${post.mod.slug}`} className="scloll-menu">
                          {post.mod.name}
                        </Link>
                        <RightOutlined className="scloll-menu-icon-small" />
                      </Space>
                    </li>
                    <li className="scloll-menu">
                      <Space>
                        <Link to={`/authors`} className="scloll-menu">
                          {post.author.name}{' '}{post.author.surname}
                        </Link>
                        <RightOutlined className="scloll-menu-icon-small" />
                      </Space>
                    </li>
                    <Text className="scloll-menu-text">
                      {post.description}{': '}{post.title}
                    </Text>
                  </ul>
                </Col>
                <Col flex="auto">
                  {!scrolEnd && (
                    <Button className="scloll-menu-btn" icon={<RightOutlined />} onClick={() => slide(50)} size="small" />
                  )}
                </Col>
              </Row>
            </Col>
            <Col flex="auto"></Col>
          </Row>
          <Row style={{ marginTop: 16 }}>
            <Col flex="auto"></Col>
            <Col flex="992px" style={{ backgroundColor: '#ffffff' }}>
              <Row style={{ paddingTop: 40, paddingBottom: 40, }}>
                <Col style={{ paddingLeft: 24, paddingRight: 24, marginLeft: 84, marginRight: 84 }} >
                  <Row>
                    <Title level={4} style={{
                      lineHeight: 1.15,
                      textTransform: 'capitalize',
                      letterSpacing: '-0.011em',
                      fontWeight: 400,

                    }}>
                      {post.description}
                    </Title>
                  </Row>
                  <Row>
                    <Title
                      style={{
                        lineHeight: 1.15,
                        textTransform: 'capitalize',
                        letterSpacing: '-0.011em',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '3em',
                      }}>
                      {post.title}
                    </Title>
                  </Row>
                  <Row>
                    <Col style={{ marginRight: 8 }}>
                      <Avatar size={48} icon={icon} />
                    </Col>
                    <Col>
                      <Row>
                        <Text style={{
                          fontSize: '1em',
                          fontWeight: 400,
                          color: '#00040D',
                        }}>{post.author.name}{' '}{post.author.surname}</Text>
                      </Row>
                      <Row>
                        <Text
                          style={{
                            fontSize: '1em',
                            fontWeight: 400,
                          }}
                        >
                          <LastPublish color={'#858585'} date={post.updated_at} /></Text>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Affix offsetTop={64}>
                <Row style={{ backgroundColor: '#ffffff' }}>
                  <Divider className="comments-plane-divider" dashed />
                  <Col span={22} style={{ minHeight: 44, }} >
                    <Row justify="start" style={{ marginLeft: 24 }}>
                      <Space align="center" size={6} style={{ minHeight: 44 }}>
                        <Button className="comments-plane-btn" icon={<HeartOutlined className="comments-plane-icon" />} size="large" />
                        <Button className="comments-plane-btn" icon={<CommentOutlined className="comments-plane-icon" />} size="large" onClick={showDrawer}>
                        


                        </Button>
                        
                      </Space>
                    </Row>
                  </Col>
                  <Col span={2} style={{ minHeight: 44 }}>
                    <Row justify="end" style={{ marginRight: 24 }}>
                      <Space align="center" size={6} style={{ minHeight: 44 }}>
                        <Tooltip title="Поделиться в Twitter"> 
                        <Button className="comments-plane-btn" href={twitterUrl}>
                            <TwitterOutlined className="comments-plane-icon"/>
                          </Button>                         
                         
                        </Tooltip>
                        {/* TODO: Добавить связь с FB и LinkedIn  */}
                        <Tooltip title="Скопировать ссылку">
                        <Button 
                          className="comments-plane-btn" 
                          onClick={() => navigator.clipboard.writeText(window.location.href)}
                          icon={<LinkOutlined  className="comments-plane-icon"/>} />
                        </Tooltip>
                      </Space>
                    </Row>
                  </Col>
                  <Divider className="comments-plane-divider" dashed />
                </Row>
              </Affix>
              <Row>
                <Col style={{ margin: 24, }}>
                  < IsPostImg post={post} />
                </Col>
              </Row>
              <Row>
                <Col style={{ paddingLeft: 24, paddingRight: 24, marginLeft: 84, marginRight: 84 }}
                >
                  <Paragraph
                    style={{

                      lineHeight: 1.5,
                      textAlign: 'left',
                      fontSize: '1.125rem'
                    }}>
                    <ReactMarkdown
                      transformImageUri={uri =>
                        uri.startsWith("http") ? uri : `${process.env.REACT_APP_BACKEND_URL}${uri}`
                      }
                      components={{
                        p: ({ node, children }) => {
                          if (node.children[0].tagName === "img") {
                            const image = node.children[0];
                            const imageProperties = image.properties.src;
                            const imgName = imageProperties.substring(9)
                            // TODO: Добавить орграничения на загурзку файлов по размеру или null в месте картинки
                            return (
                              <div style={{ textAlign: 'center', }}>
                                <Image
                                  preview={false}
                                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/xlarge_${imgName}`}
                                  alt={post.description}
                                  title={post.description}
                                  srcSet={
                                    `${process.env.REACT_APP_BACKEND_URL}/uploads/medium_${imgName} 575w, 
                                     ${process.env.REACT_APP_BACKEND_URL}/uploads/large_${imgName} 944w,
                                     ${process.env.REACT_APP_BACKEND_URL}/uploads/xlarge_${imgName} 1600w,
                                    `
                                  }
                                  sizes="(max-width: 944px) 100vw, (min-width: 945px) 948px"
                                  decoding="async"
                                  loading="lazy"
                                />
                              </div>
                            );
                          };
                          return <p >{children}</p>;
                        },
                      }}
                    >
                      {post.content}
                    </ReactMarkdown>
                  </Paragraph>
                </Col>
              </Row>
              <Row>
                <Col span={20}></Col>
                <Col span={4} style={{ marginBottom: 24 }}
                >
                </Col>
              </Row>

            </Col>
            <Col flex="auto"></Col>
          </Row>
          <Drawer 
          title="Комментарии" 
          placement="right" 
          onClose={onClose} 
          visible={visible}
          width={640}
          bodyStyle={{ paddingBottom: 80 }}
          dashed={true}
          >
            <CustomSideBar />
          </Drawer>
            </Content>
      
      

   
    
   
      </Layout>
      
  

    );
  } else if (isError) {
    content = <Alert message={`Произошла непредвиденная ошибка загрузки публикации: ${error}. Пожалуйста перезагрузите страницу.`} type="error" />
  };
  return <>{content}</>
};


