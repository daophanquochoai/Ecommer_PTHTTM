import React, {useEffect, useState} from 'react';
import {Button, Flex, Pagination, Table} from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import {NavLink} from "react-router-dom";
import {deleteProductByAdmin, getProductAdmin} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
    key: React.Key;
    name: string;
    price: number;
    discount: number;
    stock: string;
}

const columns: TableColumnsType<DataType> = [
    {
      title: 'PRODUCT NAME',
      render: (text: DataType) => <a><NavLink to={'/admin/products/' + text.key}>{text.name}</NavLink></a>,
    },
    {
      title: 'PRICE',
      dataIndex: 'price',
    },
    {
      title: 'DISCOUNT',
      dataIndex: 'discount',
    },
    {
        title: 'STOCK',
        dataIndex: 'stock',
    },
  ];

type Props = {
    categoryChoose : number,
    setProductStock : Function
}

const ProductList : React.FC = (props : Props) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([])
    const [page, setPage] = useState<number>(0)
    const [pageTotal, setPageTotal] = useState<number>(0)
    const [change, setChange] = useState<boolean>(false)

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getProductAdmin(page, props.categoryChoose);
            if( response.code === "ERR_NETWORK"){
                toast.error("Server Failt!!")
                return;
            }
            if(response.code === 200)
            {
                setPageTotal(response.totalPage)
                let dataItem: DataType[] = []
                for (const item of response.data) {
                    dataItem.push(    {
                        key: item.product_id,
                        name: item.product_title,
                        price: item.price_unit,
                        discount: item.discount === null ? 0 : item.discount,
                        stock: item.total_quantity_sold,
                    })
                }
                props.setProductStock(dataItem.length)
                setData(dataItem)
            }else{
                toast.error(response.message)
            }



        }

        fetchApi()
    }, [page, change]);
    useEffect(() => {
        setPage(0)
        setChange(!change)
    }, [props.categoryChoose]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        type : "checkbox",
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    const handleDeleteProduct = async () => {
        setLoading(true)
        selectedRowKeys.forEach( async item => {
            const response = await deleteProductByAdmin(item);
            if( response.data.code != 200 ){
                toast.error(response.data.message)
            }
        })
        setLoading(false)
        setChange(!change)
        setSelectedRowKeys([])
    }
    return (
        <Flex gap="middle" vertical>
          <div>
              <p className='font-bold text-xs md:text-base'>Products</p>
          </div>
          <Flex align="center" gap="middle">
              <Button type="primary" onClick={ () =>  handleDeleteProduct()} disabled={!hasSelected} loading={loading}>
              Delete
              </Button>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
          </Flex>
          <Table<DataType> rowSelection={rowSelection} columns={columns} loading={loading} dataSource={data} pagination={false}/>
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
          <NavLink to='/admin/products/add-product'>
              <button type="submit" className='text-white bg-black w-full p-2 mt-3 hover:bg-red-500 transition-all duration-300'>
                  ADD NEW PRODUCT
              </button>
          </NavLink>
        </Flex>
  );
};

export default ProductList;