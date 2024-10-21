import React, {useState} from 'react';
import ProductList from "./ProductList.tsx";
import CategoryList from "./CategoryList.tsx";

const ProductAdmin : React.FC = () => {
    const [categoryChoose,setCategoryChoose] = useState<number>(0)
    const [productStock, setProductStock] = useState<number>(0)
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4'>
                <ProductList categoryChoose={categoryChoose} setProductStock={setProductStock}/>
                <CategoryList setCategoryChoose={setCategoryChoose} productStock={productStock} categoryChoose={categoryChoose}/>
            </div>
        </>
    );
};     

export default ProductAdmin;