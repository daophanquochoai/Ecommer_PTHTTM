import axios, {AxiosInstance, AxiosResponse, post} from "axios";

const api: AxiosInstance = axios.create({
    baseURL: 'https://esgoo.net',
});

export async function getDataCity() {
    const response: AxiosResponse = await api.get('/api-tinhthanh/4/0.htm');
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error('Error fetching city data');
    }
}
