import {BiSupport} from "react-icons/bi";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.tsx";
import {MdOutlineExpandMore} from "react-icons/md";
import {Link} from "react-router-dom";
import HeaderTop from "./HeaderTop.tsx";
import Navbar from "./Navbar.tsx";
import Search from "./Search.tsx";
import Slider from "./Slider.tsx";

const Header = () => {

    const {isLogin } =  useContext(AppContext);
    console.log(isLogin);
    return (
        <div>
            {/*  first */}
            <HeaderTop />
            {/* second */}
            <Navbar />
            {/* search*/}
            <Search />

        </div>
    );
};

export default Header;