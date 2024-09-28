import React from 'react';
import {Select} from "antd";
import { Flex, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";

interface DataType {
    key: React.Key;
    name: string;
}

const bread = [
  {
      title : <NavLink to={'/admin/products'}>Products</NavLink>
  },
  {
      title : <span className={'text-red-500'}>Edit category</span>
  }
]

const columns: TableColumnsType<DataType> = [
    {
      dataIndex: 'name',
      render: (text: string) => <a><NavLink to='/admin/products/edit-product'>{text}</NavLink></a>,
    },
  ];
  
const data: DataType[] = [
    {
      key: '1',
      name: 'Microsoft Xbox One S Controller – Gears 5 Kait Diaz',
    },
    {
      key: '2',
      name: 'Microsoft Xbox One S Controller – Gears 5 Kait Diaz',
    },
    {
      key: '3',
      name: 'Microsoft Xbox One S Controller – Gears 5 Kait Diaz',
    },
    {
      key: '4',
      name: 'Microsoft Xbox One S Controller – Gears 5 Kait Diaz',
    },
];

const EditCategory: React.FC = () => {

    return (
        <div>
            <BreadCrumb bread={bread} />
            <form className='grid grid-cols-1 gap-9'>
                <div className='flex flex-col md:flex-row gap-9'>
                    <div className='flex-1'>
                        <div className='flex gap-2 flex-col mb-4'>
                            <label className='text-2xl'>Nest category (Optional)</label>
                            <Select 
                                defaultValue="None"
                                style={{
                                    width: '200px',
                                    height : '40px'
                                }}
                                options={[
                                    {
                                        value: 'none',
                                        label: 'None',
                                    },
                                    {
                                      value: 'computers-technologies',
                                      label: 'Computers & Technologies',
                                    },
                                    {
                                      value: 'sport-outdoor',
                                      label: 'Sport & Outdoor',
                                    },
                                    {
                                      value: 'books-office',
                                      label: 'Books & Office',
                                    },
                                  ]}
                            />
                        </div>
                        <div className='flex gap-2 flex-col mb-4'>
                            <label className='text-2xl'>Category Name <span className='text-red-500'>*</span></label>
                            <input required placeholder='Babies & Moms' className='p-2 outline-0 border-2' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 flex-1'> 
                        <p className='text-left text-2xl mb-4'>Relate products</p>
                        <Flex gap="middle" vertical>
                            <Table<DataType> columns={columns} dataSource={data} />
                        </Flex>
                    </div>
                </div>
                <div>
                    <button type='submit' className={'w-full bg-black hover:bg-red-500 text-white py-2 px-4'}>UPDATE NOW</button>
                </div>
            </form>
        </div>
    );
};

export default EditCategory;