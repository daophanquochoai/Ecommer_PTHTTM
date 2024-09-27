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
import DashBoard from "./pages/DashBoard.tsx";
import OverView from "./components/DashBoard/OverView.tsx";
import Chat from "./components/DashBoard/Chat.tsx";
import Manger from "./pages/Manger.tsx";
import Settings from "./pages/Settings.tsx";
import ProductManage from "./pages/ProductManage.tsx";
import ProductAdmin from "./components/ProductManage/ProductAdmin.tsx"
import AddProduct from "./components/ProductManage/AddProduct.tsx";
import EditProduct from "./components/ProductManage/EditProduct.tsx";
import AddCategory from "./components/ProductManage/AddCategory.tsx";
import EditCategory from "./components/ProductManage/EditCategory.tsx";

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
                element: <Cart />
            },
            {
                path: '/wishlist',
                element: <WishListPage />
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/register',
                element: <RegisterPage />
            }
        ]
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
                path: 'chat',
                element: <Chat />
            },
            {
                path: 'manager',
                element: <Manger />
            },
            {
                path: 'settings',
                element: <Settings />
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
                        path: 'edit-product',
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
            }
        ]
    }
];

const App : React.FC = ()  => {
    const element = useRoutes(routers);

  return (
      <>
          <ToastContainer autoClose={4000}/>
          {element}
      </>
  )
}

export default App
