import React from 'react';
import ProductList from "./ProductList.tsx";
import CategoryList from "./CategoryList.tsx";

const ProductAdmin : React.FC = () => {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mt-3'>
                <ProductList />
                <CategoryList />
            </div>
        </>
    );
};     

export default ProductAdmin;