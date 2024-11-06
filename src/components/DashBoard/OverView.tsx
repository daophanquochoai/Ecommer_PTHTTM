import React, {useContext, useEffect, useState} from 'react';
import Estimate from "./ChartEstimate.tsx";
import {Select, Spin} from "antd";
import {MdCrisisAlert, MdOutlinePersonPinCircle} from "react-icons/md";
import {LiaPersonBoothSolid} from "react-icons/lia";
import {IoCellularOutline} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppContext.tsx";
import {getRevenueByYear, getYearForRevenue} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";

type Estimate = {
    action: string, pv: number
}

interface YearChoooseOption {
    value: string;
    label: string;
}

interface RevenueColumn {
    month : string;
    numberMonth : number;
    revenue : number;
}

const initRevenue : RevenueColumn[] = [
    {
        month : "January",
        numberMonth : 1,
        revenue : 0
    },
    {
        month : "February",
        numberMonth : 2,
        revenue : 0
    },
    {
        month : "March",
        numberMonth : 3,
        revenue : 0
    },
    {
        month : "April",
        numberMonth : 4,
        revenue : 0
    },
    {
        month : "May",
        numberMonth : 5,
        revenue : 0
    },
    {
        month : "June",
        numberMonth : 6,
        revenue : 0
    },
    {
        month : "July",
        numberMonth : 7,
        revenue : 0
    },
    {
        month : "August",
        numberMonth : 8,
        revenue : 0
    },
    {
        month : "September",
        numberMonth : 9,
        revenue : 0
    },
    {
        month : "October",
        numberMonth : 10,
        revenue : 0
    },
    {
        month : "November",
        numberMonth : 11,
        revenue : 0
    },
    {
        month : "December",
        numberMonth : 12,
        revenue : 0
    }
]

const OverView : React.FC = () => {
    const today = new Date();
    const { setIsLogin} = useContext(AppContext)
    const [dataSource, setDataSource] = useState<Estimate[]>([])
    const navigate = useNavigate();
    // table
    const [loadingYear, setLoadingYear] = useState<boolean>(false)
    const [yearChoose, setYearChoose] = useState<number>(0);
    const [year, setYear] = useState<YearChoooseOption[]>([]);
    const [revenue, setRevenue] = useState<RevenueColumn[]>(initRevenue);
    const [loadingRevenue, setLoadingRevenue] = useState<boolean>(false);

    const [totalRevenue, setTotalRevenue] = useState<string>('---');
    const [totalSold, setTotalSold] = useState<string>('---');
    const [totalEmployee, setTotalEmployee] = useState<string>('---');
    const [totalUser, setTotalUser] = useState<string>('---');
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    }

    useEffect(() => {
        const fetchYear = async () => {
            if( localStorage.getItem("accessToken") == undefined ){
                setIsLogin(false);
                navigate('/login');
                return;
            }
            setLoadingYear(true);
            const response = await getYearForRevenue();
            setLoadingYear(false);
            if( response.code === "ERR_NETWORK"){
                toast.error("Netword don't connected!!")
                return;
            }
            if( response.data.code === 200 ){
                const data : YearChoooseOption[] = []
                response.data.data.forEach( (item, index) => {
                    data.push({
                        value: item.year,
                        label: item.year
                    })
                })
                if( response.data.data != null) setYearChoose(response.data.data[0].year)
                setYear(data);
            }else {
                toast.error(response.data.message)
            }
        }
        fetchYear()
    }, []);

    useEffect(() => {
        const fetchRevenue = async ( year : number) => {
            if( year == 0) return;
            if( localStorage.getItem("accessToken") == undefined ){
                setIsLogin(false);
                navigate('/login');
                return;
            }
            setLoadingRevenue(true);
            const response = await getRevenueByYear(year);
            setLoadingRevenue(false);
            if( response.code === "ERR_NETWORK"){
                toast.error("Netword don't connected!!")
                return;
            }
            if( response.data.code === 200 ){
                const data : RevenueColumn[] = initRevenue;
                console.log(response.data)
                response.data.data.forEach( (item, index) => {
                    data.map( it => {
                        if( it.numberMonth == item.month){
                            it.revenue = item.total_revenue;
                        }
                        return it;
                    })
                })
                setRevenue(data);
                setTotalRevenue(response.data.totalRevenue > 1000 ? (response.data.totalRevenue/1000).toLocaleString() + 'K' : response.data.totalRevenue)
                setTotalSold(response.data.totalSoldProduct > 1000 ? (response.data.totalSoldProduct/1000).toLocaleString() + 'K' : response.data.totalSoldProduct)
                setTotalUser(response.data.totalUser > 1000 ? (response.data.totalUser/1000).toLocaleString() + 'K' : response.data.totalUser)
                setTotalEmployee(response.data.totalManager > 1000 ? (response.data.totalManager/1000).toLocaleString() + 'K' : response.data.totalManager)
            }else {
                toast.error(response.data.message)
            }
        }
        fetchRevenue(yearChoose)
    }, [yearChoose]);

    return (
        <div className={'flex flex-col gap-6'}>
            <div className={'bg-white p-6'}>
                <div className={'flex justify-between items-center'}>
                    <div className={'border px-4 py-1 bg-red-300 text-white'}>{today.getMonth()}-{today.getFullYear()}</div>
                    <Select
                        value={yearChoose}
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={year}
                        loading={loadingYear}
                    />

                </div>
            </div>
            <div className={'bg-white p-6'}>
                <Spin tip={"loading..."} spinning={loadingRevenue}>
                    <Estimate revenue={revenue}/>
                </Spin>
            </div>
            <div className={'bg-white p-6 grid grid-cols-4'}>
                <div className={'flex flex-col justify-center items-center'}>
                    <div className={'text-3xl flex items-center'}>{totalRevenue}<MdCrisisAlert className={'text-green-300'}/></div>
                    <p className={'text-gray-400'}>Revenue</p>
                </div>
                <div className={'flex flex-col justify-center items-center'}>
                    <div className={'text-3xl flex items-center'}>{totalSold}<IoCellularOutline  className={'text-orange-300'}/></div>
                    <p className={'text-gray-400'}>Sold Products</p>
                </div>
                <div className={'flex flex-col justify-center items-center'}>
                    <div className={'text-3xl flex items-center'}>{totalEmployee}<MdOutlinePersonPinCircle className={'text-red-300'}/></div>
                    <p className={'text-gray-400'}>Employee</p>
                </div>
                <div className={'flex flex-col justify-center items-center'}>
                    <div className={'text-3xl flex items-center'}>{totalUser}<LiaPersonBoothSolid  className={'text-yellow-300'}/></div>
                    <p className={'text-gray-400'}>Customer</p>
                </div>
            </div>
        </div>
    );
};

export default OverView;