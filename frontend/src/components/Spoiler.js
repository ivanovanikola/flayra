import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Button, Col, Row } from 'antd';


let IsMobile = () => {
    const [width, setWidth] = useState(window.innerWidth);

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    let content;

    if (width <= 768) {
        content = (
            <h1 className="navbar-stack-container mobile" href="/login">
                Флaйра - это новое IT комьюнити.
            </h1>
        )
    } else {
        content = (
            <h1 className="navbar-stack-container" href="/login">
                Флaйра - это комьюнити гиков, увлечённых новыми IT технологиями.
            </h1>
        )
    }
    return <>{content}</>
}


export const Spoiler = () =>



<div className="navbar-stack">
                <div className="navbar-stack-container">
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
                </div>
            </div>