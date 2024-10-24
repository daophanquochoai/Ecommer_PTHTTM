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
import Chat from "./components/DashBoard/Chat.tsx";
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
import Customer from "./components/Users/Customer.tsx";
import CustomerDetail from "./components/Users/CustomerDetail.tsx";
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
                element: <ProtectedRoute elemant={<MyOrder/>} />
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
                        path: 'edit-category',
                        element: <EditCategory />
                    }
                ]
            },
            {
                path: 'users',
                element: <Users />,
                children: [
                    {
                        index : true,
                        element: <UserList />
                    },
                    {
                        path: 'staff',
                        element: <Staff />
                    },
                    {
                        path: 'staff/detail',
                        element: <StaffDetail />
                    },
                    {
                        path: 'staff/add-staff',
                        element: <AddStaff />
                    },
                    {
                        path: 'staff/add-role',
                        element: <AddRole />
                    },
                    {
                        path: 'staff/edit-role',
                        element: <EditRole />
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
