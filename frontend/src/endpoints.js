const BASE_PUBLIC = "/public";
const BASE_PRIVATE = "/private";

const GET_GOOGLE_URL = BASE_PUBLIC + '/login/google';
const POST_GOOGLE_CODE = BASE_PUBLIC + '/login/user';
const PUT_ALL_SOLD_DATA = BASE_PUBLIC + '/sold/user';
const PUT_ALL_BOUGHT_DATA_EMAIL = BASE_PUBLIC + '/bought/user/emails';
const PUT_ALL_BOUGHT_DATA_COMPANY = BASE_PUBLIC + '/bought/user/companies';

export default {
    GET_GOOGLE_URL,
    POST_GOOGLE_CODE,
    PUT_ALL_SOLD_DATA,
    PUT_ALL_BOUGHT_DATA_EMAIL,
    PUT_ALL_BOUGHT_DATA_COMPANY,
};