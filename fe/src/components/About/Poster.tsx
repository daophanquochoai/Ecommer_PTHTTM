import React from 'react';
import {GrBlockQuote} from "react-icons/gr";
import {AiOutlineMinus} from "react-icons/ai";

const Poster : React.FC = () => {
    return (
        <div className={'mt-8 md:mb-[190px]'}>
            <div className={'relative'}>
                <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/about-1.jpg'} alt={'image'}/>
                <div className={'md:w-1/2 bg-white p-4 md:absolute left-9 z-6 bottom-[-190px]'}>
                    <h2 className={'font-bold text-2xl'}>We Are Here To Dream! Our Team Is Here
                        <br/>
                        Surve You.</h2>
                    <p className={'text-base'}>At vero eos et accusamus et iusto odio digni goikussimos ducimus qui to bonfoe. Ntium voluum deleniti atque corrupti quos.</p>
                    <p className={'text-gray-400'}>Contrary to popular belief, Lorem Ipsum’s simply random text. It has roots in piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard Clintock, Latin professor at Hampden-Sydney.</p>
                    <GrBlockQuote className={'text-red-500 text-6xl'}/>
                    <p>Create stunning images with as much or as little control as you like thanks to a choice of Basic and Creative modes. Everything is up to you.</p>
                    <div className={'flex gap-1 items-center'}>
                        <AiOutlineMinus className={'text-black text-2xl'}/>
                        <p className={'font-bold text-2xl'}>Sean Morrison</p>
                    </div>
                    <p className={'ml-7 text-gray-400'}>Ceo & Founder</p>
                </div>
            </div>
        </div>
    );
};

export default Poster;