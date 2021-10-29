import React from "react";
import { Image } from 'antd';

import { getStrapiMedia } from "../../lib/media"

export const IsPostImg = ({ post }) => {

    let content;
    if (post.image === null) {
        content = null;
    } else {
        const imgName = post.image.url.substring(9);
        content =
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
    };
    return (<>{content}</>);
};
