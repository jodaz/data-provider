import axios from 'axios';
import { stringify } from 'qs';
import defaultSettings from './defaultSettings';
import {
    getIds,
    getQueryFromParams,
} from './helpers';
import interceptors from './interceptors';

export default (apiURL: string, customSettings = {}, tokenName = 'token') => {
    let url = '';
    const settings = {...customSettings, ...defaultSettings};
    const options = {
        headers: settings.headers,
    };

    const client = axios.create({
        baseURL: apiURL,
        ...settings
    });

    interceptors(client, tokenName);

    const endpoints = {
        getList: async (resource: string, params: any) => {
            const query = getQueryFromParams({ ...params, ...customSettings });

            url = `${apiURL}/${resource}?${stringify(query)}`;

            const res = await client({ url, ...options });

            return {
                data: res.data.data.map((item: string) => item),
                total: res.data.total
            }
        },
        getOne: async (resource: string, params: any) => {
            url = `${apiURL}/${resource}/${params.id}`;

            const res = await client.get(url);

            return res;
        },
        getMany: async (resource: string, params: any) => {
            const query = getIds(params);

            url = `${apiURL}/${resource}?${query}`;

            const res = await client({ url, ...options });

            return {
                data: res.data.data.map((item: string) => item),
                total: res.data.total
            }
        },
        getManyReference: async (resource: string, params: any) => {
            const query = getQueryFromParams({ ...params, ...customSettings });

            url = `${apiURL}/${resource}?${stringify(query)}`;

            const res = await client({ url, ...options });

            return {
                data: res.data.data.map((item: string) => item),
                total: res.data.total
            }
        },
        create: async (resource: string, params: any) => {
            url = `${apiURL}/${resource}`;

            const res = await client.post(url, params.data);

            return res;
        },
        update: async (resource: string, params: any) => {
            url = `${apiURL}/${resource}/${params.id}`;
            const attributes = params.data;
            delete attributes.id;
            const data = {
                ...attributes
            };

            const res = await client.put(url, data);

            return res
        },
        updateMany: async (resource: string, params: any) => {
            const query = getIds(params, settings.arrayFormat);
            url = `${apiURL}/${resource}/${query}`;

            const res = await client.get(url)

            return res
        },
        delete: async (resource: string, params: any) => {
            url = `${apiURL}/${resource}/${params.id}`;

            const res = await client.delete(url);

            return res
        },
        deleteMany: async (resource: string, params: any) => {
            const query = getIds(params, settings.arrayFormat);
            url = `${apiURL}/${resource}/${query}`;

            const res = await client.delete(url);

            return res
        }
    };

    return ({
        client, endpoints
    });
}
