import axios, {AxiosResponse} from "axios";
import {ENV} from "./Contanst.ts";
import aboutWeb from "../components/Settings/AboutWeb.tsx";
import React from "react";
import employee from "../components/Manager/Employee.tsx";

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
        const data :AxiosResponse = await axios.get(`${ENV.API_BASE}/products` + (text.length > 0 ? '?' + text.join('&') : ''), {
            headers: {
                "Authorization": `Bearer ` + localStorage.getItem("accessToken")
            }
        });
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



export const detailAccount = async () => {
    try{
        return await axios.get(`${ENV.API_BASE}/account`,{
            headers:{
                "Authorization":`Bearer ` + localStorage.getItem("accessToken")
            }
        })
    }catch (e){
        return e;
    }
}

export const updateAccount = async (data) => {
    try{
        console.log(JSON.stringify(data))
        return await axios.put(`${ENV.API_BASE}/account/edit`,
            JSON.stringify(data), // Đây là phần body của request
            {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
                }
            }
        );
    }catch (e){
        return e;
    }
}

export const addAddress = async  (addressNew : string) => {
    try{
        return await axios.post(`${ENV.API_BASE}/address/add`,
            JSON.stringify({address_name: addressNew}),
            {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
                }
            })
    }catch (e){
        return e;
    }
}

export const DefaultAddressFunc = async (key: number) => {
    try{
        return await axios.patch(`${ENV.API_BASE}/address/set-default/${key}}`,{},
            {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
                }
            }
            )
    }catch (e){
        return e;
    }
}

export const setLogOut = async () => {
    try{
        return await axios.post(`${ENV.API_BASE}/user/logout`,{},
            {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
                }
            }
        )
    }catch (e){
        return e;
    }
}
export const forgetPassword = async ( email : string) =>{
    try {
        return await axios.post(`${ENV.API_BASE}/user/password/forgot`,{
                "email": email
            }
        )
    }catch (e){
        return e;
    }
}

export const getCart = async () => {
    try {
        return await axios.get(`${ENV.API_BASE}/cart`, {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
                }
            }
        )
    }catch (e){
        return e;
    }
}

export const refreshToken = async (refreshToken: string) =>{
    try {
        const response =  await axios.post(`${ENV.API_BASE}/user/refresh-token`,{
                "refreshToken": refreshToken
            }, {
                headers: {
                    "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
                }
            }
        );
        return response.data
    }catch (e){
        return e;
    }
}

export const removeItemInCart = async ( id : number) => {
    try {
        return await axios.delete(`${ENV.API_BASE}/cart/deleteItem/` + id, {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
                }
            }
        )
    }catch (e){
        return e;
    }
}

export const addItemToCart = async (id : number, quantity : number) => {
    try {
        return await axios.post(`${ENV.API_BASE}/cart/add`,
            {
                "product_id": id,
                "ordered_quantity": quantity
            },
            {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
                }
            }
        )
    }catch (e){
        return e;
    }
}
//
// export const getWishList = async () => {
//     try {
//         return await axios.delete(`${ENV.API_BASE}/cart/deleteItem/` + id, {
//                 headers: {
//                     "Authorization": `Bearer ` + localStorage.getItem("accessToken"),
//                     "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
//                 }
//             }
//         )
//     }catch (e){
//         return e;
//     }
// }


export const getProductAdmin = async (page:number, category_id: number) => {
    try{
        const text:string[] = []
        text.push(`page=${page+1}`)
        if(category_id !== 0)
        {
            text.push(`category_id=${category_id}`)
        }
        const data :AxiosResponse = await axios.get(`${ENV.API_BASE_ADMIN}/products` +  (text.length > 0 ? '?' + text.join('&') : ''), {
            headers:{
                "Authorization":`Bearer ` + localStorage.getItem("accessToken")
            }
        });
        return await data.data;
    }
    catch ( e){
        return e;
    }
}

export const getCategoryAdmin = async (page:number) => {
    try{
        const text:string[] = []
        text.push(`page=${page+1}`)
        const data :AxiosResponse = await axios.get(`${ENV.API_BASE_ADMIN}/categories` +  (text.length > 0 ? '?' + text.join('&') : ''), {
            headers:{
                "Authorization":`Bearer ` + localStorage.getItem("accessToken")
            }
        });
        return await data.data;
    }
    catch ( e){
        return e;
    }
}

export const getProductOfCategoryAdmin = async (category_id: number) => {
    try{
        const text:string[] = []
        const data :AxiosResponse = await axios.get(`${ENV.API_BASE_ADMIN}/categories/` + category_id , {
            headers:{
                "Authorization":`Bearer ` + localStorage.getItem("accessToken")
            }
        });
        return await data.data;
    }
    catch ( e){
        return e;
    }
}

export const getProductDetail = async (product_id: number) => {
    try{
        const data :AxiosResponse = await axios.get(`${ENV.API_BASE_ADMIN}/products/edit/` +  product_id, {
            headers:{
                "Authorization":`Bearer ` + localStorage.getItem("accessToken")
            }
        });
        return await data.data;
    }
    catch ( e){
        return e;
    }
}

export const EditProductAdmin = async (product_id: number, data: object) => {
    try{
        return await axios.patch(`${ENV.API_BASE_ADMIN}/products/edit/${product_id}`,data,
            {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
                }
            }
        )
    }catch (e){
        return e;
    }
}


// ----------product---------------
export const getDetailProduct = async (product_id: number) => {
    try{
        const data = await axios.get(`${ENV.API_BASE}/products/${product_id}`, {
            headers: {
                "Authorization": `Bearer ` + localStorage.getItem("accessToken") || null,
                "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
            }
        });
        return data.data
    }catch (e){
        return e;
    }
}

// ----------end product---------------

//-----------top rating --------------
export const getTopRating = async () => {
    try{
        const data = await axios.get(`${ENV.API_BASE}/rate/top-rate/6`);
        return data.data
    }catch (e){
        return e;
    }
}
//-----------end top rating --------------

//------------comment-------------
export const getCommentList = async (product_id: number) => {
    try{
        const data = await axios.get(`${ENV.API_BASE}/comment/1`, {
            headers: {
                "Authorization": `Bearer ` + localStorage.getItem("accessToken") || null,
                "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
            }
        });
        return data.data
    }catch (e){
        return e;
    }
}

export const postComment = async (productId: number, data: object) => {
    try {
        return await axios.post(`${ENV.API_BASE}/comment/${productId}`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
                }
            }
        )
    }catch (e){
        return e;
    }
}
//------------end comment-------------

// export

export const orderPost = async (data: object) => {
    try {
        return await axios.post(`${ENV.API_BASE}/order`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
                }
            }
        )
    }catch (e){
        return e;
    }
}

export const getWishList = async () => {
    try {
        return await axios.get(`${ENV.API_BASE}/products/list/favorite`,
            {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
                }
            }
        )
    }catch (e){
        return e;
    }
}

export const removeProductInWishList = async ( productId : number) => {
    try {
        return await axios.delete(`${ENV.API_BASE}/products/delete/favorite/` + productId,
            {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
                }
            }
        )
    }catch (e){
        return e;
    }
}

export const addProductToWishlist = async (productId: number) => {
    try {
        const response = await axios.patch(`${ENV.API_BASE}/products/like/${productId}}`,{}, {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
                }
            }
        );
        return response.data
    }catch (e){
        return e;
    }
}

export const addProductToCart = async (data: object) => {
    try {
        return await axios.post(`${ENV.API_BASE}/products/wishlist/add-to-cart`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json" // Đặt Content-Type nếu gửi JSON
                }
            }
        )
    }catch (e){
        return e;
    }
}

export const getProductHotTrend = async () => {
    try {
        return await axios.get(`${ENV.API_BASE}/rate/top-rate/20`,
        )
    }catch (e){
        return e;
    }
}

export const getProductByCategory = async ( categoryId : number) => {
    try {
        return await axios.get(`${ENV.API_BASE}/categories/${categoryId}?limit=8`,
        )
    }catch (e){
        return e;
    }
}

export const getBlog = async () => {
    try {
        return await axios.get(`${ENV.API_BASE}/categories/${categoryId}?limit=8`,
        )
    }catch (e){
        return e;
    }
}

export const postOpt = async ( email : string, otp : string ) =>{
    try {
        return await axios.post(`${ENV.API_BASE}/user/password/otp`,{
                "email": email,
                "otp": otp
            }
        )
    }catch (e){
        return e;
    }
}

export const changePassword = async ( email : string, password : string, confirm : string ) => {
    try {
        return await axios.post(`${ENV.API_BASE}/user/password/reset`,{
                "email": email,
                "password": password,
                "comfirmPassword": confirm
            }
        )
    }catch (e){
        return e;
    }
}

export const getEmployee = async () => {
    try {
        return await axios.get(`${ENV.API_BASE}/admin/accounts`, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        )
    }catch (e){
        return e;
    }
}

export const addProductByAdmin = async ( productDetial : object , image_url : string[]) => {
    try {
        return await axios.post(`${ENV.API_BASE}/admin/products/create`,
            {
                ...productDetial,
                image_url : image_url
            }
            , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        )
    }catch (e){
        return e;
    }
}

export const deleteProductByAdmin = async (productId : number) => {
    try {
        return await axios.delete(`${ENV.API_BASE}/admin/products/delete/` + productId
            , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        )
    }catch (e){
        return e;
    }
}

export const addCategoryByAdmin = async ( categoryId : number, categoryTitle : string, image_url : string)=> {
    try {
        return await axios.post(`${ENV.API_BASE}/admin/categories/create`,
            {
                "parent_category_id" : categoryId,
                "category_title" : categoryTitle,
                "image_url" : image_url,
            }
            , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        )
    }catch (e){
        return e;
    }
}

export const getBlogByPage = async ( page : number)=> {
    try {
        return await axios.get(`${ENV.API_BASE}/blogs?limit=5&page=` + page,
        )
    }catch (e){
        return e;
    }
}

export const getBlogByRecent = async () => {
    try {
        return await axios.get(`${ENV.API_BASE}/blogs?limit=5&page=` + 1,
        )
    }catch (e){
        return e;
    }
}

export const submitInfoCustomer = async (    name : string,
                                             email : string,
                                             title : string,
                                             message : string) => {
    try {
        return await axios.post(`${ENV.API_BASE}/contacts`,
            {
                "fullName" : name,
                "email": email,
                "title": title,
                "content": message
            }
        )
    }catch (e){
        return e;
    }
}

export const resetPasswordForEmployee = async ( emplId : number) => {
    try {
        return await axios.post(`${ENV.API_BASE}/admin/accounts/reset-defautl-password/` + emplId,
            {},
            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        )
    }catch (e){
        return e;
    }
}

export const deleteEmpl = async ( emplId : number ) => {
    try {
        return await axios.delete(`${ENV.API_BASE}/admin/accounts/delete/` + emplId,
            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        )
    }catch (e){
        return e;
    }
}

export const deleteCategory = async ( categoryId : number ) => {
    try {
        return await axios.delete(`${ENV.API_BASE}/admin/categories/delete/` + categoryId,
            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        )
    }catch (e){
        return e;
    }
}

export const getAllOrders = async () => {
    try {
        return await axios.get(`${ENV.API_BASE}/admin/orders`,
            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        )
    }catch (e){
        return e;
    }
}

export const getOrderStatus  = async () => {
    try {
        return await axios.get(`${ENV.API_BASE}/admin/orders/status-payment`,
            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        )
    }catch (e){
        return e;
    }
}

export const updateOrderStatus = async ( orderId : number, orderStatusId : number) => {
    try {
        return await axios.post(`${ENV.API_BASE}/admin/orders/status-change/${orderId}/${orderStatusId}`,
            {},
            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        )
    }catch (e){
        return e;
    }
}

export const getAccountOfAdmin = async () => {
    try {
        return await axios.get(`${ENV.API_BASE}/admin/accounts/detail`,
            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        )
    }catch (e){
        return e;
    }
}

export const updateInfoOfAmin = async (dataObject : object) => {
    try {
        return await axios.patch(`${ENV.API_BASE}/admin/accounts/edit`,
            {...dataObject},
            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        )
    }catch (e){
        return e;
    }
}