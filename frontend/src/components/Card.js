import { Card, Avatar, Row, Col, Image, Typography, Space, Divider } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { getStrapiMedia } from "../lib/media"
import { Link } from 'react-router-dom';
import { LastPublish } from './TimeAgo';
import { SideBar } from './SideBar';
import { PostsList } from '../features/posts/PostsList';

export const CardNoImg = ({ post }) => {

    const { Meta } = Card;
    const { Title, Paragraph, Text } = Typography;


    let icon;
    if (post.author.picture === null) {
        icon = <UserOutlined />;
    } else {
        let imageUrlAvatar = getStrapiMedia(post.author.picture.formats.small);
        icon = <Image preview={false} src={imageUrlAvatar} />;
    }

    return (

        <Card style={{ marginBottom: 8 }}
        >
            <Row>
                <Col span={1}>
                    <Avatar size="small" icon={icon} />
                </Col>
                <Col span={23}>
                    <Space split={<Divider style={{ marginLeft: 0, marginRight: 0 }} type="vertical" />} style={{ marginLeft: 8 }}>
                        <Typography.Text>{post.author.name}{' '}{post.author.surname}</Typography.Text>
                        <Typography.Text><LastPublish date={post.updated_at} /></Typography.Text>
                        <Typography.Text>
                            <span> опубликовано в моде:</span>{' '}
                            <span> <Link to={`/mods/${post.mod.id}`} style={{ fontSize: '0.875rem', fontWeight: 400, color: '#00040D', textDecoration: 'underline', textDecorationColor: '#0EBF99' }}>
                                {' '}{post.mod.name}
                            </Link>
                            </span></Typography.Text>
                    </Space>

                </Col>
            </Row>
            <Row>
                <Col span={1}>
                </Col>
                <Col span={23}>
                    <Link to={`/posts/${post.slug}`} style={{ textDecoration: 'none' }}>
                        <Title level={4} style={{ lineHeight: 1.15 }} ellipsis={{ rows: 3 }}>
                            {post.title}
                        </Title>
                    </Link>

                    <Link to={`/posts/${post.slug}`} style={{ color: '#00040D', fontSize: '1rem', fontWeight: 400, textDecoration: 'none' }}>
                        <Paragraph style={{ lineHeight: 1.15, }}>
                            {post.content.substring(0, 300) + '...'}
                        </Paragraph>
                    </Link>
                </Col>
            </Row>
            <Row>
            <Col span={1}>
                </Col>
                <Col span={15} style={{ paddingRight: 8 }}>

                    <Space split={<Divider style={{ marginLeft: 0, marginRight: 0 }} type="vertical" />}>
                        <Typography.Text>147 пост автора</Typography.Text>
                        <Typography.Text>18 отметок "Нравится"</Typography.Text>
                        <Typography.Text>92 комментария</Typography.Text>
                    </Space>
                </Col>
                <Col span={7} >
                </Col>
            </Row>
        </Card>
    )
}












































// import React from 'react';
// import { Row, Col, Card, Image } from 'react-bootstrap';
// import { LastPublish } from '../../src/components/TimeAgo'
// import { getStrapiMedia } from "../../src/lib/media"
// import { Link } from 'react-router-dom'
// import { PeopleIcon } from '../icons/PeopleIcon';


// export const CardNoImage = ({ post }) => {

//     let content;
//     if (post.author.picture === null) {
//         content = <PeopleIcon />;
//     } else {
//         let imageUrlAvatar = getStrapiMedia(post.author.picture.formats.small);
//         content = <Card.Img style={{ borderRadius: '50%', width: 24, height: 24, marginRight: 8, marginBottom: 8 }} src={imageUrlAvatar} />;
//     }




//     return (
//         <Card
//             key={post.id}
//             style={{ marginBottom: 8, paddingTop: 24, paddingBottom: 24 }}>
//             <Row style={{ margin: 0 }}>
//                 <Col xs={12} style={{ paddingLeft: 24, paddingRight: 24 }}>
//                     <Card.Body style={{ padding: 0 }}>
//                         <div>
//                             <span>{content}</span>{' '}
//                             <span style={{ fontSize: '0.875rem', fontWeight: 400, }}>{post.author.name}{' '}{post.author.surname}</span>{' '}
//                             <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#0EBF99' }}>•</span>{' '}
//                             <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#00040D' }}><LastPublish date={post.updated_at} /></span>{' '}
//                             <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#0EBF99' }}>•</span>{' '}
//                             <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#00040D' }}>в моде:</span>{' '}
//                             <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#00040D', textDecoration: 'underline', textDecorationColor: '#0EBF99' }}>
//                                 <Link to={`/mods/${post.mod.id}`} style={{ fontSize: '0.875rem', fontWeight: 400, color: '#00040D', textDecoration: 'underline', textDecorationColor: '#0EBF99' }}>
//                                     {post.mod.name}
//                                 </Link>
//                             </span>
//                         </div>
//                         <Card.Title >
//                             <Link to={`/posts/${post.id}`} style={{ fontSize: '1.5rem', color: '#00040D', fontWeight: 700, textDecoration: 'none' }}>
//                                 {post.title}
//                             </Link>
//                         </Card.Title>
//                         <Card.Text>
//                             <Link to={`/posts/${post.id}`} style={{ color: '#00040D', fontSize: '1rem', fontWeight: 400, textDecoration: 'none' }}>
//                                 {post.content.substring(0, 100) + '...'}
//                             </Link>
//                         </Card.Text>
//                     </Card.Body>
//                 </Col>
//             </Row>
//         </Card>
//     )
// }

// // textDecoration: 'underline', textDecorationColor: '#0EBF99'

// export const CardWithImage = ({ post }) => {

//     const imageUrl = getStrapiMedia(post.image)


//     let content;
//     if (post.author.picture === null) {
//         content = <PeopleIcon />;
//     } else {
//         const imageUrlAvatar = getStrapiMedia(post.author.picture.formats.small);
//         content = <Card.Img style={{ borderRadius: '50%', width: 24, height: 24, marginRight: 8, marginBottom: 8 }} src={imageUrlAvatar} />;
//     }




//     return (
//         <Card
//             key={post.id}
//             style={{ marginBottom: 8, paddingTop: 24, paddingBottom: 24 }}>
//             <Row style={{ margin: 0 }}>
//                 <Col xs={8} style={{ paddingLeft: 24, paddingRight: 24 }}>
//                     <Card.Body style={{ padding: 0 }}>
//                         <div>
//                             <span>{content}</span>{' '}
//                             <span style={{ fontSize: '0.875rem', fontWeight: 400, }}>{post.author.name}{' '}{post.author.surname}</span>{' '}
//                             <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#0EBF99' }}>•</span>{' '}
//                             <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#00040D' }}><LastPublish date={post.updated_at} /></span>{' '}
//                             <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#0EBF99' }}>•</span>{' '}
//                             <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#00040D' }}>в моде:</span>{' '}
//                             <span>
//                                 <Link to={`/mods/${post.mod.id}`} style={{ fontSize: '0.875rem', fontWeight: 400, color: '#00040D', textDecoration: 'underline', textDecorationColor: '#0EBF99' }}>
//                                     {post.mod.name}
//                                 </Link>
//                             </span>
//                         </div>
//                         <Card.Title >
//                             <Link to={`/posts/${post.id}`} style={{ fontSize: '1.5rem', color: '#00040D', fontWeight: 700, textDecoration: 'none' }}>
//                                 {post.title}
//                             </Link>
//                         </Card.Title>
//                         <Link to={`/posts/${post.id}`} style={{ color: '#00040D', fontSize: '1rem', fontWeight: 400, textDecoration: 'none' }}>
//                             {post.content.substring(0, 100) + '...'}
//                         </Link>
//                     </Card.Body>
//                 </Col>
//                 <Col xs={4} style={{ paddingLeft: 24, paddingRight: 24 }}  >
//                     <Link to={`/posts/${post.id}`}>
//                         <Card.Img style={{ borderRadius: 2, maxWidth: 200, }} src={imageUrl} fluid="true" />
//                     </Link>
//                 </Col>
//             </Row>
//         </Card>
//     )
// }


