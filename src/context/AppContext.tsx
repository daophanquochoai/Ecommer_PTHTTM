import {createContext, ReactNode, useEffect, useState} from "react";
export const AppContext = createContext(undefined);


const AppProvider = ({children} : {children : ReactNode}) => {
    const [isLogin, setIsLogin] = useState<Boolean>(true);
    const [search, setSearch] = useState<string>('');
    const [price, setPrice] = useState<number[]>([0,0]);
    const [page, setPage] = useState<number>(0);
    const [rate, setRate] = useState<number>(0);
    const [categoryChoose, setCategoryChoose] = useState<number>(0);
    const [categoryList, setCategoryList] = useState<object[]>([]);
    const [filter , setFilter] = useState<string>('Relate');
    const [info, setInfo] = useState<object>(null);
    const  logo = 'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/logo.png'

    useEffect(() => {
        const fetchApi = async () => {
            // const data = await
        }
    }, []);
    const value : {
        setCategoryList: (value: (((prevState: object[]) => object[]) | object[])) => void;
        categoryChoose: number;
        setSearch: (value: (((prevState: string) => string) | string)) => void;
        setPrice: (value: (((prevState: number[]) => number[]) | number[])) => void;
        setRate: (value: (((prevState: number) => number) | number)) => void;
        setFilter: (value: (((prevState: string) => string) | string)) => void;
        setIsLogin: (value: (((prevState: Boolean) => Boolean) | Boolean)) => void;
        filter: string;
        isLogin: Boolean;
        search: string;
        setCategoryChoose: (value: (((prevState: number) => number) | number)) => void;
        rate: number;
        price: number[];
        categoryList: object[];
        logo: string;
        page: number;
        setInfo: (value: (((prevState: object) => object) | object)) => void;
        setPage: (value: (((prevState: number) => number) | number)) => void;
        info: object
    } = {
        isLogin,
        setIsLogin,
        logo,
        search,
        setSearch,
        price,
        setPrice,
        page,
        setPage,
        rate,
        setRate,
        categoryChoose,
        setCategoryChoose,
        categoryList,
        setCategoryList,
        info,
        setInfo,
        filter,
        setFilter
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;
