import axios, { AxiosResponse } from 'axios';
import { VehicleMake } from '../models/vehiclemake';

const sleep=(delay:number)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay)
    })
}

axios.defaults.baseURL = "https://localhost:7296/api";

axios.interceptors.response.use(response=>{
    return sleep(1000).then(()=>{
        return response;
    }).catch((error)=>{
        console.log(error);
        return Promise.reject(error);
    })
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const VehicleMakes = {
    list: () => requests.get<VehicleMake[]>('/VehicleMakes'),
    details:(id:string)=>requests.get<VehicleMake>(`/VehicleMakes/${id}`),
    create:(vehicleMake:VehicleMake)=>axios.post<void>('/VehicleMakes',vehicleMake),
    update:(vehicleMake:VehicleMake)=>axios.put<void>(`/VehicleMakes/${vehicleMake.id}`, vehicleMake),
    delete:(id:string)=>axios.delete<void>(`/VehicleMakes/${id}`)
}

const agent = {
    VehicleMakes
}

export default agent;