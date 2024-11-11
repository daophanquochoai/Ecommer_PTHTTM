import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useRoutes} from "react-router-dom";
import Container from "./pages/Container.tsx";
import Home from "./pages/Home.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import Blogs from "./pages/Blogs.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Cart from "./pages/Cart.tsx";
import WishListPage from "./pages/WishListPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ForgetPage from "./pages/ForgetPage.tsx";
import DashBoard from "./pages/DashBoard.tsx";
import OverView from "./components/DashBoard/OverView.tsx";
import Manger from "./pages/Manger.tsx";
import Settings from "./pages/Settings.tsx";
import ListSetting from "./components/Settings/ListSetting.tsx";
import AboutWeb from "./components/Settings/AboutWeb.tsx";
import ContactInfo from "./components/Settings/ContactInfo.tsx";
import TimeLanguage from "./components/Settings/TimeLanguage.tsx";
import Payment from "./components/Settings/Payment.tsx";
import ProductManage from "./pages/ProductManage.tsx";
import ProductAdmin from "./components/ProductManage/ProductAdmin.tsx"
import AddProduct from "./components/ProductManage/AddProduct.tsx";
import EditProduct from "./components/ProductManage/EditProduct.tsx";
import AddCategory from "./components/ProductManage/AddCategory.tsx";
import EditCategory from "./components/ProductManage/EditCategory.tsx";
import BlogManage from "./pages/BlogManage.tsx";
import BlogList from "./components/BlogManage/BlogList.tsx";
import AddBlog from "./components/BlogManage/AddBlog.tsx";
import EditBlog from "./components/BlogManage/EditBlog.tsx";
import ContactManage from "./pages/ContactManage.tsx";
import ContactList from "./components/ContactManage/ContactList.tsx";
import ResponseContact from "./components/ContactManage/ResponseContact.tsx";
import {Spin} from "antd";
import {useEffect, useState} from "react";
import ProductDetail from "./pages/ProductDetail.tsx";
import MyOrder from "./pages/MyOrder.tsx";
import Service from "./pages/Service.tsx";
import PolicyTerm from "./components/Service/GeneralInfo/PolicyTerm.tsx";
import SafeShopping from "./components/Service/GeneralInfo/SafeShopping.tsx";
import Order from "./components/Service/OrderDelivery/Order.tsx";
import Delivery from "./components/Service/OrderDelivery/Delivery.tsx";
import Users from "./pages/Users.tsx";
import UserList from "./components/Users/UserList.tsx";

import Staff from "./components/Users/Staff.tsx";
import StaffDetail from "./components/Users/StaffDetail.tsx";
import AddStaff from "./components/Users/AddStaff.tsx";
import AddRole from "./components/Users/AddRole.tsx";
import EditRole from "./components/Users/EditRole.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import OTP from "./pages/OTP.tsx";
import AcceptCart from "./pages/AcceptCart.tsx";
import OrderManage from "./pages/OrderManage.tsx";

export const routers = [
    {
        path: "/",
        element: <Container />, // Đây là component chính của route "/"
        children: [
            {
                index: true, // Route mặc định cho path "/"
                element: <Home /> // Component hiển thị cho route "/"
            },
            {
                path: '/category',
                element: <ProductPage />
            },
            {
                path: '/category/:id',
                element: <ProductDetail />
            },
            {
                path: '/blogs',
                element: <Blogs />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/cart',
                element: <ProtectedRoute element={<Cart />}/>
            },
            {
                path: '/wishlist',
                element: <ProtectedRoute element={<WishListPage />}/>
            },
            {
                path: '/myorder',
                element: <ProtectedRoute element={<MyOrder/>} />
            }
        ]
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/forget',
        element: <ForgetPage />
    },
    {
        path: '/otp',
        element: <OTP />
    },
    {
        path: "/acceptCart",
        element: <ProtectedRoute element={<AcceptCart/>}/>,
    },
    {
        path: '/admin',
        element: <DashBoard />,
        children: [
            {
                index : true,
                element: <OverView />
            },
            {
                path: 'manager',
                element: <Manger />
            },
            {
                path: 'order',
                element: <OrderManage />
            },
            {
                path: 'settings',
                element: <Settings />,
                children: [
                    {
                        index : true,
                        element: <ListSetting />
                    },
                    {
                        path: 'about-web',
                        element: <AboutWeb />
                    },
                    {
                        path: 'contact-info',
                        element: <ContactInfo />
                    },
                    {
                        path: 'time-language',
                        element: <TimeLanguage />
                    },
                    {
                        path: 'payment',
                        element: <Payment />
                    }
                ]
            },
            {
                path: 'products',
                element: <ProductManage />,
                children: [
                    {
                        index : true,
                        element: <ProductAdmin />
                    },
                    {
                        path: 'add-product',
                        element: <AddProduct />
                    },
                    {
                        path: ':id',
                        element: <EditProduct />
                    },
                    {
                        path: 'add-category',
                        element: <AddCategory />
                    },
                    {
                        path: 'edit-category/:id',
                        element: <EditCategory />
                    }
                ]
            },
            {
                path: 'blogs',
                element: <BlogManage />,
                children: [
                    {
                        index : true,
                        element: <BlogList />
                    },
                    {
                        path: 'add-blog',
                        element: <AddBlog />
                    },
                    {
                        path: ':id',
                        element: <EditBlog />
                    }
                ]
            },
            {
                path: 'contact',
                element: <ContactManage />,
                children: [
                    {
                        index : true,
                        element: <ContactList />
                    },
                    {
                        path: ':id',
                        element: <ResponseContact />
                    }
                ]
            }
        ]
    },
    {
        path: '/service',
        element: <Service />,
        children: [
            {
                path: 'policy-term',
                element: <PolicyTerm />
            },
            {
                path: 'safe-shopping',
                element: <SafeShopping />
            },
            {
                path: 'order',
                element: <Order />
            },
            {
                path: 'delivery',
                element: <Delivery />
            },
        ]
    }
];

const App : React.FC = ()  => {
    const element = useRoutes(routers);
    const [isLoading, setIsLoading]  = useState<boolean>(true);
    useEffect( () => {
        window.addEventListener('load',() => setIsLoading(false))
    });
    return (
        <>
            <ToastContainer autoClose={4000}/>
            {
                isLoading ?
                    <>
                        <div className={'bg-white'}>
                            <Spin tip="Loading..." size="large" fullscreen={true} style={{background : 'white'}}>
                            </Spin>
                        </div>
                    </>
                    :
                    <>
                        {element}
                    </>
            }
        </>
    );
};

export default App;
