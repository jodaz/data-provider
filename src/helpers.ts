import { stringify } from 'qs';

interface IQuery {
    page: number | string;
    perPage: number | string;
    filter?: any;
    sort?: string;
    order?: string;
}

const getQueryFromParams = (params: any) => {
    const { offsetPageNum } = params
    const { page, perPage } = params.pagination;

    let currPage = page;
    if (offsetPageNum !== null || offsetPageNum !== undefined) {
        currPage += offsetPageNum
    }

    // Create query with pagination params.
    const query: IQuery = {
        'page': currPage,
        'perPage': perPage,
    };

    // Add all filter params to query.
    Object.keys(params.filter || {}).forEach((key) => {
        query[`filter[${key}]`] = params.filter[key];
    });

    // Add sort parameter
    if (params.sort && params.sort.field) {
        query.sort = params.sort.field;
        query.order = params.sort.order === 'ASC' ? 'asc' : 'desc';
    }

    return query;
}

const getIds = (params: any, arrayFormat?: any ) => {
    const query = stringify({
        'filter[id]': params.ids,
    }, { arrayFormat: arrayFormat });

    return query;
}

export {
    getQueryFromParams,
    getIds
};
