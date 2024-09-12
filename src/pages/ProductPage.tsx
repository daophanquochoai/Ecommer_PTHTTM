import React from 'react';
import BreadCrumb from "../components/Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";
import Policy from "../components/Body/Policy.tsx";
import ListProduct from "../components/Product/ListProduct.tsx";
const bread: object  = [
    {
        title: String,
    },
    {
        title: String,
    }
]
const ProductPage : React.FC = () => {
    const bread = [
        {
            title : <NavLink to={'/'}>HOME</NavLink>
        },
        {
            title : <span className={'text-red-500'}>PRODUCT</span>
        }
    ]
    return (
        <div className={'mx-[5%]'}>
            <BreadCrumb bread={bread}/>
            <ListProduct />
            <Policy />
        </div>
    );
};

export default ProductPage;