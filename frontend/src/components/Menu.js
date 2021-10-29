
import { Menu, Row, Col, Divider } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import 'antd/dist/antd.css';
import { useGetModsQuery } from '../features/api/apiSlice';
import { Link } from 'react-router-dom';
import { LastPublish } from './TimeAgo';


export const MainMenu = () => {

    const { SubMenu } = Menu;
    const [current, setCurrent] = useState('');

    const handleClick = e => {
        setCurrent({ current: e.key });
    };

    const { data: mods = [] } = useGetModsQuery()

    const renderedMods = mods.map((mod) => (

        <Menu.Item key={mod.slug}>
            <Link to={`/mods/${mod.slug}`} style={{ textDecoration: 'none', color: '#00040D' }}>
                {mod.name}
            </Link>
        </Menu.Item>



    ))


    return (
        <>
           
                    <Row style={{marginBottom: 8}}>
                        <Col span={24}>
                            <Menu style={{ backgroundColor: '#ffffff', marginTop: 24}} onClick={handleClick} selectedKeys={[current.current]} mode="horizontal" >
                                {renderedMods}
                            </Menu>
                        </Col>

                    </Row>
                



        </>
    );
}
