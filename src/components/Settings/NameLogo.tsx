import React from 'react';
import {Upload} from "antd";
import {GrUploadOption} from "react-icons/gr";

const NameLogo : React.FC = () => {
    return (
        <div className={'mt-3'}>
            <p className={"text-left text-2xl font-semibold text-gray-700 mb-4"}>Website name and logo</p> 
            <form className={"border-l-2"}>
                <div className={"max-w-lg p-6"}>
                    <p className={"block text-gray-700 font-bold mb-2"}>Website name</p>
                    <input className={"w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-4"} name={"name"}/>
                    <p className={"block text-gray-700 font-bold mb-2"}>Logo</p>
                    <div>
                        <Upload
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            maxCount={1}
                            listType="picture-card"
                            onChange={(e)=>{console.log(e)}}
                        >
                            <GrUploadOption />
                        </Upload>
                    </div>
                </div>
                <div className={"flex justify-end w-4/5"}>
                    <button type="submit" className={"w-auto p-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-500 transition duration-300"}>
                        Save changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NameLogo;