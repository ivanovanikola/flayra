import { Image } from 'react-bootstrap';
import React, {  } from "react"
import { UserOutlined} from '@ant-design/icons';

export const CurrentUserAvatar = ( {currentUser, width, height} ) => {

    let content;
    if (currentUser.user.author.picture === null) {
        content = <UserOutlined 
            width={width} 
            height={height} 
        />;
    } else {
        const imageUrl = currentUser.user.author.picture.formats.small.url;
        content = <Image 
            preview={false} 
            width={width} 
            height={height} 
            style={{borderRadius: '50%'}} 
            src={`${process.env.REACT_APP_BACKEND_URL}${imageUrl}`}  />;
    }
    return content;
};
