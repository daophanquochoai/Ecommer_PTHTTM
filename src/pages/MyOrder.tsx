import React from 'react';
import {NavLink} from "react-router-dom";
import BreadCrumb from "../components/Body/BreadCrumb.tsx";
import TableItem from "../components/Cart/TableItem.tsx";
import TableProcess from "../components/Cart/TableProcess.tsx";
import Policy from "../components/Body/Policy.tsx";
import {Divider, Steps} from "antd";
import TableOrder from "../components/MyOrder/TableOrder.tsx";
import TableHistory from "../components/MyOrder/TableHistory.tsx";
const bread : object[] = [
    {
        title: <NavLink to={'/'}>HOME</NavLink>,
    },
    {
        title: <span className={'text-red-500'}>MY ORDER</span>,
    }
]
const MyOrder : React.FC = () => {
    return (
        <div>
            <div className={'mx-[5%] mt-3'}>
                <div>
                    <BreadCrumb bread={bread}/>
                    <Divider>Order Recent</Divider>
                    <div  className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_2fr] gap-4'}>
                        <div>
                            <Steps
                                progressDot
                                current={3}
                                direction="vertical"
                                items={[
                                    {
                                        title: 'Awaiting Confirmation',
                                        description: 'The order is placed and is waiting for confirmation from the seller.',
                                    },
                                    {
                                        title: 'Order Confirmation',
                                        description: 'The seller or system confirms the order, and the next steps are prepared.',
                                    },
                                    {
                                        title: 'In Transit',
                                        description: 'The order has been shipped and is on its way to the customer.',
                                    },
                                    {
                                        title: 'Delivered',
                                        description: 'The order has successfully reached the customer, and the transaction is complete.',
                                    }
                                ]}
                            />
                        </div>
                        <div>
                            <TableOrder />
                        </div>
                    </div>
                    <Divider>History</Divider>
                    <div className={'mt-8'}>
                        <TableHistory />
                    </div>
                    <Policy />
                </div>
            </div>
        </div>
    );
};

export default MyOrder;