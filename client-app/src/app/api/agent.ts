import axios, { Axios, AxiosResponse } from "axios";
import { Activity } from "../Models/Activity";

axios.defaults.baseURL = "http://localhost:5000/api";

const resposeBody = <T>(respose :AxiosResponse<T>) => respose.data;

const sleep = (delay : number)=>{
    return new Promise(resolve=>{
        setTimeout(resolve,delay)
    })
}

axios.interceptors.response.use(async respose =>{
    try{
        await sleep(1000);
        return respose;
    }catch(error)
    {
        console.log(error);
        return await Promise.reject(error);
    }
})

const requests = {
    get  : <T>(url : string)=>axios.get<T>(url).then(resposeBody),
    post : <T>(url : string, body:{})=>axios.post<T>(url,body).then(resposeBody),
    put : <T>(url : string,  body:{})=>axios.put<T>(url, body).then(resposeBody),
    delete : <T>(url : string)=>axios.delete<T>(url).then(resposeBody)
}

const Activities ={
    list:()=> axios.get<Activity[]>('/activities'),
    details:(id: string)=> axios.get<Activity>(`/activities/${id}`),
    create:(activty : Activity)=>axios.post<void>('/activities/', activty),
    update : (activty : Activity) => axios.put<void>(`/activities/${activty.id}`,activty),
    delete : (id:string) => axios.delete<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;


