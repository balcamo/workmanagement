import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

// This is the Azure auth congig for test
const adalConfig = {
 tenant: 'ebba2929-765b-48f7-8c03-9b450ed099ba',
 clientId: 'a3620ea5-8460-480a-a3f0-f2a7f8e0d41b',
 endpoints: {
     api: 'a3620ea5-8460-480a-a3f0-f2a7f8e0d41b'
 },
 apiUrl: 'https://apiarytest-react-homepage.azurewebsites.net',
 cacheLocation: 'localStorage'
};
/*
 * // This is the Azure auth congig for prod
const adalConfig = {
    tenant: 'ebba2929-765b-48f7-8c03-9b450ed099ba',
    clientId: 'e398a7e5-e3e4-45ed-8ddd-5b68ce30fe18',
    endpoints: {
        api: 'e398a7e5-e3e4-45ed-8ddd-5b68ce30fe18'
    },
    apiUrl: 'https://apiarystableprod.azurewebsites.net',
    cacheLocation: 'localStorage'
};

*/
export const authContext = new AuthenticationContext(adalConfig);
export const adalApiFetch = (fetch, url, options) =>
    adalFetch(authContext, adalConfig.endpoints.api, fetch, adalConfig.apiUrl + url, options);
export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);