const BASE_PUBLIC = "/public";
const BASE_PRIVATE = "/private";

const GET_GOOGLE_URL = BASE_PUBLIC + '/login/google';
const POST_GOOGLE_CODE = BASE_PUBLIC + '/login/user';

const PUT_ALL_SOLD_DATA = BASE_PUBLIC + '/sold/user';
const PUT_ALL_IN_PROGRESS_DATA = BASE_PUBLIC + '/sold/progress';
const PUT_ALL_USER_PROGRESS_DATA = BASE_PUBLIC + '/sold/user/progress';
const PUT_USER_TRANSACTION = BASE_PUBLIC + '/sold/user/transaction';
const DELETE_IN_PROGRESS_ROW_DATA = BASE_PUBLIC + '/sold/user/delete/data';
const DELETE_PROGRESS_TABLE = BASE_PUBLIC + '/sold/user/delete/table';
const ACCEPT_PROGRESS_TABLE = BASE_PUBLIC + '/sold/user/accept/table';

const PUT_ALL_BOUGHT_DATA_EMAIL = BASE_PUBLIC + '/bought/user/emails';
const PUT_ALL_BOUGHT_DATA_COMPANY = BASE_PUBLIC + '/bought/user/companies';
const PUT_TABLES_NUMBER = BASE_PUBLIC + '/bought/user/number';


const GET_CURRENT_VALUE = BASE_PUBLIC + '/wallet/user/current';

const GET_EXPLORED = BASE_PUBLIC + '/home/user/explored';
const PUT_EXPLORED_PATH = BASE_PUBLIC + '/home/user/explored/path';


const GET_EMAIL_CATEGORIES = BASE_PUBLIC + '/explored/emails';
const GET_COMPANY_CATEGORIES = BASE_PUBLIC + '/explored/companies';
const PUT_EXPLORED_TAG_EXAMPLE_DATA = BASE_PUBLIC + '/explored/data/example';
const PUT_EXPLORED_PROVINCE = BASE_PUBLIC + '/explored/data/province';
const PUT_EXPLORED_TAG_DESCRIPTION = BASE_PUBLIC + '/explored/data/description';

const GET_CATEGORIES = BASE_PUBLIC + '/admin/categories';
const GET_TAGS = BASE_PUBLIC + '/admin/tags';
const UPDATE_TAG_VALUE = BASE_PUBLIC + '/admin/tag/update';

const PUT_TABLE_TO_BUY = BASE_PUBLIC + '/buy/user/table';
const GET_EMAIL_TABLES = BASE_PUBLIC + '/buy/user/table/emails';
const GET_COMPANY_TABLES = BASE_PUBLIC + '/buy/user/table/companies';
const PUT_CLEAR_CART = BASE_PUBLIC + '/buy/user/table/clear';


export default {
    GET_GOOGLE_URL,
    POST_GOOGLE_CODE,

    PUT_ALL_SOLD_DATA,
    PUT_ALL_IN_PROGRESS_DATA,
    PUT_ALL_USER_PROGRESS_DATA,
    PUT_USER_TRANSACTION,
    DELETE_IN_PROGRESS_ROW_DATA,
    DELETE_PROGRESS_TABLE,
    ACCEPT_PROGRESS_TABLE,

    PUT_ALL_BOUGHT_DATA_EMAIL,
    PUT_ALL_BOUGHT_DATA_COMPANY,
    PUT_TABLES_NUMBER,

    GET_CURRENT_VALUE,

    GET_EXPLORED,
    PUT_EXPLORED_PATH,
    PUT_EXPLORED_TAG_EXAMPLE_DATA,
    PUT_EXPLORED_PROVINCE,
    PUT_EXPLORED_TAG_DESCRIPTION,

    GET_EMAIL_CATEGORIES,
    GET_COMPANY_CATEGORIES,

    GET_CATEGORIES,
    GET_TAGS,
    UPDATE_TAG_VALUE,

    PUT_TABLE_TO_BUY,
    GET_EMAIL_TABLES,
    GET_COMPANY_TABLES,
    PUT_CLEAR_CART
};