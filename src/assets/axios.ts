import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

interface Param {
    url: string
    metodo: string
    envio?: any
}

type Callback = (status: number | AxiosError, response: AxiosResponse | AxiosError, item: any) => void

export function sendAxios(param: Param, callback: Callback, item: any): void {
    const settings: AxiosRequestConfig = {
        url: param.url,
        method: param.metodo as AxiosRequestConfig['method'],
        data: param.envio
    }

    axios(settings)
        .then((response: AxiosResponse) => {
            callback(response.status, response, item)
        })
        .catch((error: AxiosError) => {
            callback(error.response?.status || 500, error, item)
        });
}
