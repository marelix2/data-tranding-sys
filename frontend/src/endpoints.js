const BASE_PUBLIC = "/public";
const BASE_PRIVATE = "/private";

const GET_GOOGLE_URL = BASE_PUBLIC + '/login/google';
const POST_GOOGLE_CODE = BASE_PUBLIC + '/login/user';

const PUT_ALL_SOLD_DATA = BASE_PUBLIC + '/sold/user';

const PUT_ALL_BOUGHT_DATA_EMAIL = BASE_PUBLIC + '/bought/user/emails';
const PUT_ALL_BOUGHT_DATA_COMPANY = BASE_PUBLIC + '/bought/user/companies';
const PUT_TABLES_NUMBER = BASE_PUBLIC + '/bought/user/number';

const GET_CURRENT_VALUE = BASE_PUBLIC + '/wallet/user/current';

const GET_EXPLORED = BASE_PUBLIC + '/home/user/explored';
const PUT_EXPLORED_PATH = BASE_PUBLIC + '/home/user/explored/path';

const GET_EMAIL_CATEGORIES = BASE_PUBLIC + '/explored/emails';
const GET_COMPANY_CATEGORIES = BASE_PUBLIC + '/explored/companies';

export default {
    GET_GOOGLE_URL,
    POST_GOOGLE_CODE,

    PUT_ALL_SOLD_DATA,
    
    PUT_ALL_BOUGHT_DATA_EMAIL,
    PUT_ALL_BOUGHT_DATA_COMPANY,
    PUT_TABLES_NUMBER,

    GET_CURRENT_VALUE,

    GET_EXPLORED,
    PUT_EXPLORED_PATH,

    GET_EMAIL_CATEGORIES,
    GET_COMPANY_CATEGORIES,
};