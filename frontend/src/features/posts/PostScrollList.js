import React from 'react';
import { Navbar, Container, Row, Col, Card, Badge, Nav, NavDropdown, Button, NavItem, Dropdown, OverlayTrigger, Popover, Image } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack'
import { PersonBadgeIcon } from '../../icons/PersonBadgeIcon';
import { getStrapiMedia } from "../../lib/media"
import { HeartIcon } from '../../icons/HeartIcon'
import { ChatIcon } from '../../icons/ChatIcon'
import { ShareIcon } from '../../icons/ShareIcon'





export const PostScrollList = () => {

    return (
        <Stack style={{ backgroundColor: '#fafafa', minHeight: 65, marginTop: 65 }}>
            <Container>
                <Row>
                    <Col xs={12} >
                        <Row >
                            <Col >
                                <Card style={{ marginBottom: 8, paddingTop: 24, paddingBottom: 24 }}>
                                    <Row style={{ margin: 0 }}>
                                        <Col xs={12} style={{ paddingLeft: 24, paddingRight: 24 }}>
                                            <Card.Body style={{ padding: 0 }}>
                                                <span style={{fontSize: '1rem', fontWeight:400, }}>DEV</span>{' '}
                                                <span style={{color: '#807e7c'}}>•</span>{' '}<span style={{color: '#807e7c'}}>@developer</span>{' '}<span style={{color: '#807e7c'}}>•</span>
                                                {' '}<span style={{color: '#807e7c'}}>11 минут</span>{' '}<span style={{color: '#807e7c'}}>•</span>{' '}<span 
                                                style={{ fontSize: '1rem',color: '#807e7c', fontWeight:400, textDecoration: 'underline', textDecorationColor: '#0EBF99'}}>Java</span>
                                            
                                                <Card.Title style={{ fontSize: '1.5rem', color: '#000', fontWeight:700, }}>Заголовок статьи</Card.Title>
                                                <Card.Text style={{fontSize: '1rem', fontWeight:400, }}>
                                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                                </Card.Text>

                                               
                                                



                                            </Card.Body>


                                        </Col>
                                    </Row>
                                </Card>
                                <Card style={{ marginBottom: 8, paddingTop: 24, paddingBottom: 24 }}>
                                    <Row style={{ margin: 0 }}>
                                        <Col xs={7} style={{ paddingLeft: 24, paddingRight: 0 }} >
                                            <Card.Body style={{ padding: 0 }}>
                                            <span style={{fontSize: '1rem', fontWeight:400, }}>DEV</span>{' '}
                                                <span style={{color: '#807e7c'}}>•</span>{' '}<span style={{color: '#807e7c'}}>@developer</span>{' '}<span style={{color: '#807e7c'}}>•</span>
                                                {' '}<span style={{color: '#807e7c'}}>11 минут</span>{' '}<span style={{color: '#807e7c'}}>•</span>{' '}<span 
                                                style={{ fontSize: '1rem',color: '#807e7c', fontWeight:400, textDecoration: 'underline', textDecorationColor: '#0EBF99'}}>Java</span>
                                                 <Card.Title style={{ fontSize: '1.5rem', color: '#000', fontWeight:700, }}>Заголовок статьи</Card.Title>
                                                 <Card.Text style={{fontSize: '1rem', fontWeight:400, }}>
                                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                                </Card.Text>
                                               
                                            </Card.Body>
                                        </Col>
                                        <Col xs={5} style={{ paddingLeft: 24, paddingRight: 24 }}  >
                                            <Card.Img style={{ borderRadius: 2, maxWidth: 216, }} src="http://localhost:1337/uploads/t1_496ca20bb9.jpeg" fluid />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Stack>




    )
};


