import React  from 'react';
import {Select} from "antd";

const AddCategory: React.FC = () => {
    
    return (
        <div>
            <p className='text-left text-2xl font-bold mb-4'>Add category</p>
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
                                      value: 'babies-moms',
                                      label: 'Babies & Moms',
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
                            <input required className='p-2 outline-0 border-2' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 flex-1'></div>
                </div>
                <div>
                    <button type='submit' className={'w-full bg-black hover:bg-red-500 text-white py-2 px-4'}>ADD CATEGORY NOW</button>
                </div>
            </form>
        </div>
    );
};

export default AddCategory;