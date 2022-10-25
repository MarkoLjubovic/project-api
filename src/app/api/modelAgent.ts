import axios, { AxiosResponse } from 'axios';
import { VehicleModel } from '../models/vehiclemodel';

const sleep=(delay:number)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay)
    })
}

axios.defaults.baseURL = "https://localhost:7296/api";

axios.interceptors.response.use(async response=>{
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

const VehicleModels = {
    list: () => requests.get<VehicleModel[]>('/VehicleModels'),
    details:(id:string)=>requests.get<VehicleModel>(`/VehicleModels/${id}`),
    create:(vehicleModel:VehicleModel)=>axios.post<void>('/VehicleModels',vehicleModel),
    update:(vehicleModel:VehicleModel)=>axios.put<void>(`/VehicleModels/${vehicleModel.id}`, vehicleModel),
    delete:(id:string)=>axios.delete<void>(`/VehicleModels/${id}`)
}

const agent = {
    VehicleModels
}

export default agent;