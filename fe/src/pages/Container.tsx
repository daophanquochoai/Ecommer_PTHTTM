import React from 'react';
import Header from "../components/Header/Header.tsx";
import Footer from "../components/Footer/Footer.tsx";
import {Outlet} from "react-router-dom";

const Container : React.FC = () => {
    return (
        <div className={'bg-primary'}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Container;