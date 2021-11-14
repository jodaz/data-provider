export default (instance: any, tokenName: string) => {
    // Request interceptor
    instance.interceptors.request.use(
        (config: any) => {
        const token = localStorage.getItem(tokenName);

        const newConfig = config;

        // When a 'token' is available set as Bearer token.
        if (token) {
            newConfig.headers.Authorization = `Bearer ${token}`;
        }

        return newConfig;
        },
        (err: any) => Promise.reject(err),
    );
};
