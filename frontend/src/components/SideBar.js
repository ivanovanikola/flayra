import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Affix, Button, Col, Divider, Row, Typography, Space, Tabs, Radio } from 'antd';
import { useMostReadPostsQuery } from '../features/api/apiSlice'
import classnames from 'classnames'
import { LastPublish } from './TimeAgo';
import { Spinner } from '../../src/components/Spinner'
import { Link } from 'react-router-dom';




export const SideBar = () => {
  const [container, setContainer] = useState(null);
  const { Title, Paragraph, Text, Link } = Typography;
  const { TabPane } = Tabs;



 
  const {
    data: posts,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useMostReadPostsQuery();

  let content
  let i = 1;

  if (isLoading) {
    content = <Spinner text="Загрузка..." />
  } else if (isSuccess) {
    console.log('posts', posts)
    const renderedPosts = posts.map(post => (
      <MostRead key={post.id} post={post} i={i++}/>
    ))
    const containerClassname = classnames('posts-container', {
      disabled: isFetching
    })
    content = <div className={containerClassname}>{renderedPosts}</div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  
  return (
    <div className="scrollable-container" ref={setContainer}  >
      <div className="background">
        <Affix style={{ position: 'fixed', top: 64, width: '100%', backgroundColor: '#f0f2f5', height: '100%' }} target={() => container}>
          <Row  style={{ marginTop: 24 }}>
            <Col span={5} style={{ marginLeft: 24, marginRight: 24  }}>
             <Row>
              <Col>
              <Divider style={{ marginTop: 0, marginBottom: 0 }} />
              <Title level={4} style={{margin: 0, paddingTop: 6, paddingBottom: 6, textTransform: 'uppercase',}}>Читаемые</Title>
              <Divider style={{ marginTop: 0, marginBottom: 0 }} />
              {content}
              </Col>
             </Row>
             <Row>
              <Col span={24} style={{ marginTop: 24, }}>
                  <Space size={1} align="start" wrap>
                    <Link to={`/`} style={{ textDecoration: 'none' , color: '#000' }}>
                      <Text keyboard  style={{ color: '#000' }}>
                        Проект
                      </Text>
                    </Link>
                    <Link to={`/`} style={{ textDecoration: 'none' }}>
                      <Text keyboard >
                        Миссия
                      </Text>
                    </Link>
                    <Link to={`/`} style={{ textDecoration: 'none' }}>
                      <Text keyboard >
                        Авторам
                      </Text>
                    </Link>
                    <Link to={`/`} style={{ textDecoration: 'none' }}>
                      <Text keyboard >
                        Контакты
                      </Text>
                    </Link>
                    <Link to={`/`} style={{ textDecoration: 'none' }}>
                      <Text keyboard >
                      Конфиденциальность
                      </Text>
                    </Link>
                    <Link to={`/`} style={{ textDecoration: 'none' }}>
                      <Text keyboard >
                        Условия
                      </Text>
                    </Link>
                    <Link to={`/`} style={{ textDecoration: 'none' }}>
                      <Text keyboard >
                        Реклама
                      </Text>
                    </Link>
                  </Space>
              </Col>
             </Row>


             <Row>
              <Col span={24} style={{ marginTop: 24, }}>
              
                  <Space size={1}>
                      <Text keyboard  style={{ color: '#000' }}>  
                      © FLAYRA, {new Date().getFullYear()}
                      </Text>
                    
                   

                 

                  </Space>

              
              </Col>
             </Row>
             
             
             
            </Col>
            <Col span={5}>
            </Col>
          </Row>
        </Affix>
      </div>
    </div>
  );
};

let MostRead = ({post, i}) => {

  const { Title, Paragraph, Text } = Typography;

  return (
    <>
      <Row>
        <Col  >

          <Space align="center" >
            <Title level={3} style={{ margin: 0 }}>{i}</Title>
            <Text style={{ margin: 0 }}>{post.mod.name}</Text>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col>
        <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                     <Title className="title-most-read" level={4} style={{lineHeight: 1.15}} ellipsis={{ rows: 3 }}>
                            {post.title}
                          
        </Title>  
                    </Link>
       
        </Col>
      </Row>
      <Row>
        <Col>
        <LastPublish date={post.updated_at} />


        </Col>
        <Divider style={{ marginTop: 6, marginBottom: 6, }} dashed />
      </Row>
    </>
  )
}