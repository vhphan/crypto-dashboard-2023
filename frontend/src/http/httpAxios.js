import axios from 'axios';
import {ref} from "vue";

console.log(import.meta.env.PROD);
import {
    Loading,
    QSpinnerGears
} from 'quasar';
import {triggerNegative} from "@/utils/notifications.js";

const apiTimeoutInMs = 25_000;

export function getBaseUrl() {
    if (import.meta.env.PROD) {
        return import.meta.env.VITE_API_BASE_URL_PROD;
    }
    return import.meta.env.VITE_API_BASE_URL_DEV;
}

const showLoading = function () {
    Loading.show({
        spinner: QSpinnerGears,
        // other props
    });
};
const hideLoading = function () {
    Loading.hide();
};

export class MyFetch {
    constructor(baseUrl, options = {}) {
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
            timeout: apiTimeoutInMs,
            ...options,
        });
        this.isFetching = ref(false);
    }

    errorHandling(error, statusCode) {
        triggerNegative({
            message: error.message,
            position: 'center',
        });
        const errorMessage = error.response?.data?.message || error.statusText;
        triggerNegative({
            message: errorMessage,
        });
        if (statusCode !== 200) {
            triggerNegative({
                message: `Something went wrong. Status code ${statusCode}`,
            });
        }
    }

    static generateUrl(url, params = {}) {
        const query = new URLSearchParams(params).toString();
        return url + '?' + query;
    }

    async get(url, options = {}) {
        try {
            console.log('axios getting....', url, options);
            this.isFetching.value = true;
            showLoading();
            const response = await this.axiosInstance.get(url, options);
            this.isFetching.value = false;
            hideLoading();
            return {
                error: null,
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            this.isFetching.value = false;
            hideLoading();
            this.errorHandling(error, error.response?.status);
            return {
                error: error,
                data: null,
                status: error.response?.status,
            };
        }
    }


    async post(url, data = {}, options = {}) {
        try {
            this.isFetching.value = true;
            showLoading();
            const response = await this.axiosInstance.post(url, data, options);
            this.isFetching.value = false;
            hideLoading();
            return {
                error: null,
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            this.isFetching.value = false;
            hideLoading();
            this.errorHandling(error, error.response?.status);
            return {
                error: error,
                data: null,
                status: error.response?.status,
            };
        }
    }

}

export const BASE_URL_NODE = getBaseUrl();
export const apiAx = () => new MyFetch(BASE_URL_NODE);
