import FooterTop from "./FooterTop.tsx";
import FooterBody from "./FooterBody.tsx";
import FooterBottom from "./FooterBottom.tsx";

const Footer = () => {
    return (
        <div className={'bg-white mt-8 px-[10%] py-8'}>
            <FooterTop/>
            <FooterBody />
            <FooterBottom />
        </div>
    );
};

export default Footer;