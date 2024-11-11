import React from 'react';
import {Outlet} from "react-router-dom";

const BlogManage : React.FC = () => {
    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    );
};

export default BlogManage;