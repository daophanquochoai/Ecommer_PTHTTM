import Header from "../components/Header/Header.tsx";
import Slider from "../components/Header/Slider.tsx";
import Trending from "../components/Body/Trending.tsx";
import Sale from "../components/Body/Sale.tsx";
import ListProduct from "../components/Body/ListProduct.tsx";
import Policy from "../components/Body/Policy.tsx";
import Footer from "../components/Footer/Footer.tsx";


const Home = () => {
    return (
        <div>
            <Header />
            <Slider/>
            <Trending />
            <Sale />
            <ListProduct title={'Flash Deals'}/>
            <ListProduct title={'Recommend To You'}/>
            <Policy />
            <Footer />
        </div>
    );
};

export default Home;