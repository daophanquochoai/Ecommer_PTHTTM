import {BsFillMenuButtonWideFill} from "react-icons/bs";
import {IoMdArrowDropdown, IoMdArrowDropup} from "react-icons/io";
import React, {useContext, useEffect, useState} from "react";
import {FaRegCircle} from "react-icons/fa";
import {IoSearchSharp} from "react-icons/io5";
import {AppContext} from "../../context/AppContext.tsx";
import {useNavigate} from "react-router-dom";
import {Tree, TreeDataNode} from "antd";
import {getCategory} from "../../Utils/Helper.tsx";

const Search = () => {
    const [visible, setViible]  = useState<boolean>(false) ;
    const [category, setCategory] = useState< TreeDataNode[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {categoryChoose, setCategoryChoose, categoryList, setCategoryList}  = useContext(AppContext)
    const {search, setSearch} = useContext(AppContext);
    const [searchKey, setSearchKey] = useState<string>("");
    const navigate = useNavigate();

    const handleSearch = () => {
        setSearch(searchKey);
        navigate('/category')
    }

    const onSelect = (e) => {
        setCategoryChoose(e);
        console.log(categoryChoose)
    }

    const dip = (arr:object[], data : object[]) => {
        data.forEach(
            (d, index) => {
                const text = {
                    title: <li className={'text-[14px] md:text-xl text-gray-400 cursor-pointer hover:text-red-500'} onClick={()=> setViible(false)}>{d.category_title}</li>,
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
            const treeCategory : TreeDataNode[] = []
            dip(treeCategory, data)
            setCategory(treeCategory)
        }
        const fetchCategory = async () => {
            const data = await getCategory();
            setCategoryList(data.categories)
            createTreeCategory(data.categories)
            setIsLoading(false)
        }
        fetchCategory()
    }, []);

    return (
        <div className={'flex px-[5%] py-1 bg-red-500 justify-center md:justify-between items-center'}>
            {/* category*/}
            <div className={'relative'}>
                <div onClick={() => setViible(!visible)} className={'hidden md:flex bg-red-400 p-2 items-center gap-4 text-white group cursor-pointer'}>
                    <div>
                        <BsFillMenuButtonWideFill />
                    </div>
                    <div>ALL CATEGORYS</div>
                    <div>
                        {
                            visible ?
                                <IoMdArrowDropup />
                                :
                                <IoMdArrowDropdown />
                        }
                    </div>
                </div>
                {
                    visible &&
                    <div  className={'flex absolute flex-col top-[53px] px-5 py-2 z-10 bg-white left-0'}>
                        <Tree
                            onSelect={onSelect}
                            treeData={category} />
                    </div>
                }
            </div>
            {/* search */}
            <div className={'w-full  sm:w-3/4 md:w-2/4'}>
                <div className={'flex items-center bg-white p-1 md:p-2 justify-between'}>
                    <div className={'flex gap-2 items-center w-full'}>
                        <IoSearchSharp className={'text-red-500 text-xl'}/>
                        <input className={'flex-1 md:p-2 outline-0 p-1'} value={searchKey} onChange={ (e) => setSearchKey(e.target.value)}/>
                    </div>
                    <button className={'text-sm w-1/5 bg-red-500 text-white md:text-base p-1 md:py-2'} onClick={() => handleSearch()}>Search</button>
                </div>
            </div>
        </div>
    );
};

export default Search;