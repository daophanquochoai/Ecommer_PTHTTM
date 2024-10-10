import React, {useContext, useEffect, useState} from 'react';
import Skeleton from "react-loading-skeleton";
import {getCategory} from "../../Utils/Helper.tsx";
import {Tree, TreeDataNode} from "antd";
import {AppContext} from "../../context/AppContext.tsx";

const ListCategory : React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [category, setCategory] = useState< TreeDataNode[]>([]);
    const {categoryChoose, setCategoryChoose, categoryList, setCategoryList, setPage} = useContext(AppContext);

    const onSelect = (e) => {
        setPage(0)
        setCategoryChoose(e);
    }

    const dip = (arr:object[], data : object[]) => {
        data.forEach(
            (d, index) => {
                const text = {
                    title: <li className={'text-[14px] md:text-xl text-gray-400 cursor-pointer hover:text-red-500'}>{d.category_title}</li>,
                    key : d.category_id
                }
                if( d.hasOwnProperty('children')){
                    text.children = []
                    dip(text.children, d.children);
                }
                // console.log(text)
                arr.push(text);
            }
        )
    }

    useEffect(() => {
        const createTreeCategory = ( data : object[]) => {
            const treeCategory : TreeDataNode[] = [
                {
                    title: <li className={'text-[14px] md:text-xl text-gray-400 cursor-pointer hover:text-red-500'}>ALL</li>,
                    key : 0
                }
            ]
            dip(treeCategory, data)
            setCategory(treeCategory)
        }
        const fetchCategory = async () => {
            if( categoryList.length < 1 ){
                const data = await getCategory();
                setCategoryList(data.categories)
                createTreeCategory(data.categories)
                setIsLoading(false)
                return;
            }
            createTreeCategory(categoryList)
            setIsLoading(false)
        }
        fetchCategory()
    }, []);

    return (
        <div className={'bg-white p-4'}>
            <div className={'flex flex-col'}>
                <div>
                    <span className={'pb-2 border-b-2 border-red-500 text-xs sm:text-base lg:text-2xl font-bold'}>Product categories</span>
                </div>
                <ul className={'flex flex-col gap-4 mt-5 max-h-[500px] overflow-y-scroll'}>
                    {
                        isLoading ?
                            <Skeleton className={'h-[30px]'}/>
                            :
                            <Tree
                            onSelect={onSelect}
                            treeData={category}
                />
                    }
                </ul>
            </div>
        </div>
    );
};

export default ListCategory;