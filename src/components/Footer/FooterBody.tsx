import {useState} from "react";
import {toast} from "react-toastify";

const FooterBody = () => {
    const [email, setEmail] = useState<string>('')

    const submitEmailHandler = () => {
        if( email.trim() === ''){
            toast.error("Email can't empty !!", {
                position: "top-right"
            });

        }
    }
    return (
        <div className={'mt-7'}>
            <div className={'p-2 grid lg:grid-cols-[1fr_1fr_2fr] border-2'}>
                <div className={'flex flex-col md:flex-row gap-4 items-center lg:border-r-2 justify-center'}>
                    <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/icon5.png'} alt={''}/>
                    <p className={'text-xl font-bold'}>
                        Sign Up  For
                        <br/>
                        Newletters
                    </p>
                </div>
                <div className={'flex text-center text-xs md:text-base md:text-start justify-center p-2 text-gray-400'}>
                    <p>Subscribe to the weekly newsletter for all the latest updates</p>
                </div>
                <div className={' flex px-10 py-2 flex-col md:flex-row'}>
                    <input className={'outline-0 border-2 flex-1 p-2'} value={email} placeholder={'Your Email'} onChange={ (prev) => setEmail(prev.target.value)}/>
                    <button className={'hover:bg-red-500 py-2 md:py-0 justify-center flex items-center h-full px-5 bg-black text-white'} onClick={() => submitEmailHandler()} >Subscribe</button>
                </div>
            </div>
        </div>
    );
};

export default FooterBody;