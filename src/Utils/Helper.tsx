import axios, {AxiosResponse} from "axios";
import {ENV} from "./Contanst.ts";
import aboutWeb from "../components/Settings/AboutWeb.tsx";

export const getProduct = async ( categoryChoose : number, rate : number, price:number[], search:string) => {
    const text = []
    if( categoryChoose > 0 ){
        text.push('category_id=' +categoryChoose)
    }
    if( price[1] != 0){
        text.push(`fromPrice=${price[0]}&toPrice=${price[1]}`)
    }
    text.push("rate=" + rate);
    if( search !== ''){
        text.push('searchKey=' + search);
    }
    const data :AxiosResponse = await axios.get(`${ENV.API_BASE}/products` + (text.length > 0 ? '?' + text.join('&') : ''));
    return await data.data;
}
export const getCategory = async () => {
    const data :AxiosResponse = await axios.get(`${ENV.API_BASE}/categories`);
    return await data.data;
}

export const getRangePrice = async () => {}

export const parseJwt = (token : string) => {
    if (!token) { return }
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
}

export const loginAccount = async ( username : string, password : string ) => {
    try{
        return await axios.post(`${ENV.API_BASE}/user/login`,{
            username : username,
            password : password
        })
    }catch (e){
        return e;
    }
}