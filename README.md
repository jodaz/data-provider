# data-provider

A laravel/objectionjs-focused JSONAPI dataprovider for [react-admin](https://github.com/marmelab/react-admin). Currently supports all dataproviders methods:

- `getList`
- `getMany`
- `getManyReference`
- `getOne`
- `create`
- `update`
- `delete`

This packages also exposes an axios client for custom endpoints.

## Usage

1. Install the package `npm i -D @jodaz_/data-provider`.
2. Import and set the base url, retrieve the endpoint object and pass it as the dataprovider for react-admin.


``` javascript
//in app.js
import React from "react";
import { Admin, Resource } from "react-admin";
import dataProvider from '@jodaz_/data-provider';

const { endpoints, client } = dataProvider('http://your.api.endpoint', {
  offsetPageNum: -1,
  // Other axios configs
}, 'Your token name used in localstorage');

const App = () => (
  <Admin dashboard={Dashboard} dataProvider={endpoints}>
    ...
  </Admin>
);

export default App;
```

## API
```
  dataProvider(api, customConfigs, tokenName);
```

- `api`: a valid API route **REQUIRED**.
- `customConfigs`: an object of custom axios configs.
- `tokenName`: a valid token name used when retrieving a Bearer token from localStorage.

- `endpoints`: exports all the required resources for react-admin.
- `client`: exports an axios client for custom api endpoint calls.

## Other custom configs

- `"offsetPageNum": number` an offset for page counter

## Credits

I must give a huge thanks to [@henvo](https://github.com/henvo/ra-jsonapi-client). I literally copy-pasted his original repo and adapted to my own codebase.
