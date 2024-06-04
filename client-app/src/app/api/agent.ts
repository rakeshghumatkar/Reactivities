import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { Activity } from "../Models/Activity";
import { store, useStore } from "../stores/store";

axios.defaults.baseURL = "http://localhost:5000/api";


const resposeBody = <T>(respose: AxiosResponse<T>) => respose.data;

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

axios.interceptors.response.use(async respose => {
    await sleep(1000);
    return respose;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;

    switch (status) {
        case 400:
            if (config.method == "get" && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
                router.navigate("/not-found");
            }
            if (data.errors) {
                const modelStateErrors = [];
                for (var key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat()
            }
            else
                toast.error("Bad Request");
            break;
        case 401:
            toast.error("Unauthrized");
            break;
        case 403:
            toast.error("Forbidden");
            break;
        case 404:
            toast.error("Not Found")
            router.navigate("/not-found");
            break;
        case 500:
            store.commonStore.setErrors(data);
            router.navigate("/server-error")
            break;
    }
    return Promise.reject(error);
})

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(resposeBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(resposeBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(resposeBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(resposeBody)
}

const Activities = {
    list: () => axios.get<Activity[]>('/activities'),
    details: (id: string) => axios.get<Activity>(`/activities/${id}`),
    create: (activty: Activity) => axios.post<void>('/activities/', activty),
    update: (activty: Activity) => axios.put<void>(`/activities/${activty.id}`, activty),
    delete: (id: string) => axios.delete<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;


