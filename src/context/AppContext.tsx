import {createContext, ReactNode, useEffect, useState} from "react";
import {detailAccount, getAccountOfAdmin, getCart, parseJwt, refreshToken} from "../Utils/Helper.tsx";
import {toast} from "react-toastify";
export const AppContext = createContext(undefined);

interface DataType {
    key: number;
    Product: object;
    Price: number;
    Quantity: number;
}

type INFOMATION = {
    "user_id": number,
    "credential_id": number,
    "first_name": string,
    "last_name": string,
    "image_url": string,
    "email": string,
    "phone": string,
    "addresses": [
        {
            "address_id": number,
            "address_name": string,
            "user_id": number,
            "default_address": number,
        }
    ]
}

const AppProvider = ({children} : {children : ReactNode}) => {
    const [isLogin, setIsLogin] = useState<Boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [price, setPrice] = useState<number[]>([0,0]);
    const [page, setPage] = useState<number>(0);
    const [rate, setRate] = useState<number>(0);
    const [categoryChoose, setCategoryChoose] = useState<number>(0);
    const [categoryList, setCategoryList] = useState<object[]>([]);
    const [filter , setFilter] = useState<string>('Relate');
    const [info, setInfo] = useState<INFOMATION>({
            "user_id": 0,
            "credential_id": 0,
            "first_name": '',
            "last_name": '',
            "image_url": '',
            "email": '',
            "phone": '',
            "role" : '',
            "addresses": [
                {
                    "address_id": 0,
                    "address_name": '',
                    "user_id": 0,
                    "default_address": 0,
                }
            ]
            });
    const [cart, setCart] = useState<object[]>([])
    const  logo = 'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/logo.png';


    useEffect(() => {
        const fetchApi = async () => {
            if( localStorage.getItem("accessToken") === null){
                setIsLogin(false);
                return;
            }
            const token = parseJwt(localStorage.getItem("accessToken"))
            if( token.role === 'ADMIN' || token.role === "PRODUCTMANAGER"){
                const response = await getAccountOfAdmin();
                if( response.data.code === "ERR_NETWORK"){
                    toast.error("Load Category Fail!!")
                    return;
                }
                if(response.data.code === 400 && response.data.message === "access-token-expired")
                {
                    toast.error("Refresh Token!!")
                    const response = await refreshToken(localStorage.getItem("refreshToken"));
                    if( response.code === "ERR_NETWORK"){
                        toast.error("ERR_NETWORK")
                        return;
                    }
                    if(response.code === 200)
                    {
                        localStorage.setItem("accessToken", response.token);
                        return;
                    }
                    else
                    {
                        toast.error("Refresh Token Fail!!")
                    }
                }
                if(response.data.code === 401)
                {
                    toast.error("Invalid Token!")
                    return;
                }
                if(response.data.code === 200)
                {
                    const item = response.data.data;
                    setInfo(
                        {
                            "user_id": item.user_id,
                            "credential_id": item.credential_id,
                            "first_name": item.first_name,
                            "last_name": item.last_name,
                            "image_url": item.image_url,
                            "email": item.email,
                            "phone": item.phone,
                            "role" : token.role ,
                            "addresses": [
                            ]
                        }
                    )
                    setIsLogin(true)
                    return;
                }else{
                    setIsLogin(false)
                }
                return
            }

            const data = await detailAccount();
            if( data.code === "ERR_NETWORK"){
                toast.error("Load Category Fail!!")
                return;
            }
            if(data.data.code === 400 && data.data.message === "access-token-expired")
            {
                toast.error("Refresh Token!!")
                const response = await refreshToken(localStorage.getItem("refreshToken"));
                if( data.code === "ERR_NETWORK"){
                    toast.error("ERR_NETWORK")
                    return;
                }
                if(response.code === 200)
                {
                    localStorage.setItem("accessToken", response.token);
                    return;
                }
                else
                {
                    toast.error("Refresh Token Fail!!")
                }
            }
            if(data.data.code === 401)
            {
                toast.error("Invalid Token!")
                return;
            }
            if(data.data.code === 200)
            {
                const item = data.data.data;
                setInfo({
                    "user_id": item.user_id,
                    "credential_id": item.credential_id,
                    "first_name": item.first_name,
                    "last_name": item.last_name,
                    "image_url": item.image_url,
                    "email": item.email,
                    "phone": item.phone,
                    "role" : token.role ,
                    "addresses": item.addresses
                })
                setIsLogin(true)
                return;
            }else{
                setIsLogin(false)
            }
        };
        fetchApi();

    }, [isLogin]);

    useEffect(() => {
        console.log(info)
    }, [info]);
    useEffect(() => {
        console.log('get cart')
        const accessToken = localStorage.getItem("accessToken");
        if(!accessToken)
        {
            return;
        }
        const token = parseJwt(localStorage.getItem("accessToken"))
        if( token.role === 'ADMIN' || token.role === "PRODUCTMANAGER"){
            return
        }
        const fetchCart = async () => {
            const response = await getCart();
            if( response.code === "ERR_NETWORK"){
                toast.error("Netword don't connected!!")
                return;
            }
            if( response.data.code === 200 ){
                const data : DataType[] = []
                response.data.data.forEach( (item, index) => {
                    data.push({
                        key : item.cart_item_id,
                        Product: {
                            'image' : item.infoProduct.image_url,
                            'title' : item.infoProduct.product_title
                        },
                        Price: item.infoProduct.price_unit,
                        Quantity: item.ordered_quantity
                    })
                })
                setCart(data)
                setIsLogin(true)
            }else {
                toast.error(response.data.message)
                toast.error("Please reload web!")
            }
        }
        fetchCart()
    }, []);
    useEffect(() => {
        // console.log(info)
    }, [info]);
    const value : {
        setCategoryList: (value: (((prevState: object[]) => object[]) | object[])) => void;
        categoryChoose: number;
        setCart: (value: (((prevState: object[]) => object[]) | object[])) => void;
        setSearch: (value: (((prevState: string) => string) | string)) => void;
        setPrice: (value: (((prevState: number[]) => number[]) | number[])) => void;
        setRate: (value: (((prevState: number) => number) | number)) => void;
        cart: object[];
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
        setFilter,
        cart,
        setCart
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;
