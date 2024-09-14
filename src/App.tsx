import React, { useState } from 'react'
import Home from "./pages/Home.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Blogs from "./pages/Blogs.tsx";
import Cart from "./pages/Cart.tsx";
const App : React.FC = ()  => {
  const [count, setCount] = useState(0)

  return (
      <>
          <ToastContainer autoClose={4000}/>
          <div className={'bg-primary'}>
              <Header />
              <Routes>
                  <Route element={<Home />} path={'/'}/>
                  <Route element={<About />} path={'/about'}/>
                  <Route element={<Contact />} path={'/contact'}/>
                  <Route element={<ProductPage />} path={'/category'}/>
                  <Route element={<ProductDetail />} path={'/category/:id'}/>
                  <Route element={<Blogs />} path={'/blogs'}/>
                  <Route element={<Cart />} path={'/cart'}/>
              </Routes>
              <Footer />
          </div>
      </>
  )
}

export default App
