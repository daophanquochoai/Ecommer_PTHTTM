import React, {useEffect, useState} from 'react';
import {Button, Flex, Pagination, Table} from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import {NavLink} from "react-router-dom";
import {deleteCategory, getCategoryAdmin, getProductOfCategoryAdmin} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
    key: React.Key;
    name: string;
}

const columns: TableColumnsType<DataType> = [
    {
      title: 'CATEGORY NAME',
      dataIndex: 'name',
      render: (text: string) => <NavLink to='/admin/products/edit-category'>{text}</NavLink>,
    },
  ];

type Props = {
    setCategoryChoose : Function,
    productStock : number
}
  

const CategoryList : React.FC = ( props: Props) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([])
    const [page, setPage] = useState<number>(0)
    const [pageTotal, setPageTotal] = useState<number>(0)


    useEffect(() => {
        const fetchApi = async () => {
            const response = await getCategoryAdmin(page);
            if( response.code === "ERR_NETWORK"){
                toast.error("Server Failt!!")
                return;
            }
            if(response.code === 200)
            {
                setPageTotal(response.totalPage)
                let dataItem: DataType[] = []
                for (const item of response.data) {
                    dataItem.push({
                        key: item.category_id,
                        name: item.category_title
                    })
                };
                setData(dataItem)
            }
        };
        fetchApi()
    }, [page]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys)
        const category_id = newSelectedRowKeys[0] || 0;
        props.setCategoryChoose(category_id)

        // [11, 23, 22]
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    const handleDeleteCategory = async () => {
        if( props.productStock > 0 ){
            toast.warning("Category has product!")
            return
        }
        setLoading(true)
        const response = await deleteCategory(selectedRowKeys[0]);
        setLoading(false);
        if( response.data.code === "ERR_NETWORK"){
            toast.error("Server Failt!!")
            return;
        }
        if(response.data.code === 200)
        {
            toast.success("Category removed!!")
            setData(data.filter(item => item.key !== selectedRowKeys[0]))
        }else{
            toast.error(response.data.message)
        }
    }

    return (
        <Flex gap="middle" vertical>
        <div>
            <p className='font-bold text-xs md:text-base'>Product Categories</p>
        </div>
        <Flex align="center" gap="middle">
            <Button type="primary" onClick={()=> handleDeleteCategory()} disabled={!hasSelected} loading={loading}>
            Delete
            </Button>
        </Flex>
        <Table<DataType> rowSelection={{ type: "radio", ...rowSelection }} loading={loading} columns={columns} dataSource={data} pagination={false}/>
        <div className={'p-5 flex items-center justify-center w-full'}>
            <div>
                <Pagination
                    current={page + 1}
                    onChange={e => setPage(e -1)}
                    total={pageTotal*8}
                    showSizeChange={false}
                    defaultPageSize={8}
                    responsive={true}
                />
            </div>
        </div>
        <NavLink to='/admin/products/add-category'>      
            <button className='text-white bg-black w-full p-2 mt-3 hover:bg-red-500 transition-all duration-300'>
                ADD NEW CATEGORY
            </button>
        </NavLink>
        </Flex>
  );
};

export default CategoryList;