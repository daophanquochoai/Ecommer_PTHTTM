import axios, {AxiosResponse} from "axios";
import {ENV} from "./Contanst.ts";
import aboutWeb from "../components/Settings/AboutWeb.tsx";

export const getProduct = async (page: number, categoryChoose : number, rate : number, price:number[], search:string, filter : string) => {
    try{
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
        if(filter == "product_title")
        {
            text.push('sortKey=product_title&sortValue=ASC')
        }
        else if(filter === "high")
        {
            text.push('sortKey=price_unit&sortValue=DESC')
        }
        else if(filter === "low")
        {
            text.push('sortKey=price_unit&sortValue=ASC')
        }else if(filter === "star")
        {
            text.push('sortKey=star&sortValue=DESC')
        }
        text.push(`page=${page+1}`)
        const data :AxiosResponse = await axios.get(`${ENV.API_BASE}/products` + (text.length > 0 ? '?' + text.join('&') : ''));
        return await data.data;
    }
    catch ( e){
        return e;
    }
}
export const getCategory = async () => {
    try{
        const data :AxiosResponse = await axios.get(`${ENV.API_BASE}/categories`);
        return await data.data;
    }catch ( e){
        return e;
    }
}

export const getRangePrice = async () => {
    try {
        const data :AxiosResponse = await axios.get(`${ENV.API_BASE}/categories/get-price`);
        return await data.data;
    }
    catch (e) {
        return e
    }
}

export const parseJwt = (token : string) => {
   try{
       if (!token) { return }
       const base64Url = token.split('.')[1]
       const base64 = base64Url.replace('-', '+').replace('_', '/')
       return JSON.parse(window.atob(base64))
   }
   catch ( e){
       return e;
   }
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

export const registerAccount = async ( username : string, password : string, first_name: string, last_name: string, email: string, phone: string, image_url: string ) => {
    try{
        return await axios.post(`${ENV.API_BASE}/user/register`,{
            username : username,
            password : password,
            first_name : first_name,
            last_name : last_name,
            email : email,
            phone : phone,
            image_url: image_url
        })
    }catch (e){
        return e;
    }
}

// export const detailAccount = async () => {
//     try{
//         return await axios.get(`${ENV.API_BASE}/account`,{
//             headers:{
//                 "Authorization":
//             }
//         })
//     }catch (e){
//         return e;
//     }
// }