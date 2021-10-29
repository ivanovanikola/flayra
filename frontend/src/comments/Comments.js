import React from "react";
import { Layout, Row, Typography, Space, Input, Divider } from "antd";
import "./SideBar.css"
import Paragraph from "antd/lib/skeleton/Paragraph";
import Button from "@restart/ui/esm/Button";

export const CustomSideBar = () => {

   const  {Title, Text, Paragraph} = Typography;
   const { TextArea } = Input;

   const onChange = e => {
    console.log('Change:', e.target.value);
  };
  
  return (
    <Layout.Sider
      className="sidebar"
      breakpoint={"lg"}
      theme="light"
      collapsedWidth={0}
      trigger={null}
    >
<Row>
<Space>
      <Typography.Link>Link</Typography.Link>
      <Typography.Link>Link</Typography.Link>
      <Typography.Link>Link</Typography.Link>
    </Space>
</Row>
<Row>
<Title>
    Заголовок
</Title>
<Paragraph>
    Правила комментариев
</Paragraph>
</Row>
<Row>

<TextArea showCount maxLength={2000} onChange={onChange} />
<Text>Описание к полю</Text>
</Row>

<Row> 
<Button></Button>

</Row>
<Row>
<Divider></Divider>

<Space>
      <Typography.Link>Link</Typography.Link>
      <Typography.Link>Link</Typography.Link>
      <Typography.Link>Link</Typography.Link>
    </Space>

<Divider></Divider>
</Row>




   </Layout.Sider>
   );
};
