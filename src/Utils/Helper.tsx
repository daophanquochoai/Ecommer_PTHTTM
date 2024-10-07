import axios, {AxiosResponse} from "axios";
import {ENV} from "./Contanst.ts";

export const getProduct = async () => {
    const data :AxiosResponse = await axios.get(`${ENV.API_BASE}/products`);
    return await data.data;
}