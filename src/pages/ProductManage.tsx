import React from 'react';
import {Outlet} from "react-router-dom";

const ProductManage : React.FC = () => {
    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    );
};     

export default ProductManage;