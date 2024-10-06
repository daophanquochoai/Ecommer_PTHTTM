import React from 'react';
import {GetProp, Menu, MenuProps} from "antd";
import {SettingOutlined, ProductOutlined, UserOutlined} from '@ant-design/icons';
import {GrOverview, GrUserManager} from "react-icons/gr";
import {NavLink} from "react-router-dom";
import {CiChat1} from "react-icons/ci";

type MenuItem = GetProp<MenuProps, 'items'>[number];
const items: MenuItem[] = [
    {
        key: '1',
        icon: <GrOverview />,
        label: (
            <NavLink to={'/admin'}>
                Overview
            </NavLink>
        ),
    },
    {
        key: '2',
        icon: <CiChat1 />,
        label: (
            <NavLink to={'/admin/chat'}>
                Chat
            </NavLink>
        ),
    },
    {
        key: '3',
        label: (
            <NavLink to={'/admin/manager'}>
                Manager
            </NavLink>
        ),
        icon: <GrUserManager />,
    },

    {
        key: '4',
        label: (
            <NavLink to={'/admin/settings'}>
                Settings
            </NavLink>
        ),
        icon: <SettingOutlined />,
    },

    {
        key: '5',
        label: (
            <NavLink to={'/admin/products'}>
                Products
            </NavLink>
        ),
        icon: <ProductOutlined />

    },

    {
        key: '6',
        label: (
            <NavLink to={'/admin/users'}>
                Users
            </NavLink>
        ),
        icon: <UserOutlined />

    }
];

type Props = {
    collapsed : boolean,
}
const SiderBar : React.FC = (props : Props ) => {
    return (
        <div className={'border h-[100vh] py-4 bg-white'}>
            <div className={`flex items-center py-5 justify-center`}>
                {
                    !props.props.collapsed &&
                    <>
                        <div></div>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/logo.png'} alt={'logo'}/>
                    </>
                }
            </div>
            <div>
                <div>
                    <div>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            items={items}
                            className={'max-h-[80vh] overflow-y-scroll'}
                            inlineCollapsed={props.props.collapsed}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiderBar;