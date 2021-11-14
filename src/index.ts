import axios from 'axios';
import { stringify } from 'qs';
import defaultSettings from './defaultSettings';
import {
    getIds,
    getQueryFromParams,
} from './helpers';
import interceptors from './interceptors';

const dataProvider = (apiURL: string, customSettings = {}, tokenName = 'token') => {
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

    return ({
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

            return { data: { ...res.data  } }
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
            const { id, attributes  } = res.data;

            return {
                data: {
                    id, ...attributes,
                },
            };
        },
        update: async (resource: string, params: any) => {
            url = `${apiURL}/${resource}/${params.id}`;
            const attributes = params.data;
            delete attributes.id;
            const data = {
                ...attributes
            };

            const res = await client.put(url, data);

            return {
                data: { ...res.data }
            }
        },
        updateMany: (_resource: string, _params: any) => Promise,
        delete: async (resource: string, params: any) => {
            url = `${apiURL}/${resource}/${params.id}`;

            const res = await client.delete(url);

            return { data: { ...res.data } }
        },
        deleteMany: async (resource: string, params: any) => {
            const query = getIds(params, settings.arrayFormat);
            url = `${apiURL}/${resource}/${query}`;

            const res = await client.delete(url);

            return { data: { ...res.data } }
        },
        get: async (endpoint: string) => {
            url = `${apiURL}/${endpoint}`;

            const res = await client.get(url);

            return res.data;
        },
        post: async (endpoint: string, data: any) => {
            url = `${apiURL}/${endpoint}`;

            const res = await client.post(url, data);

            return res.data;
        }
    });
}

export default dataProvider;