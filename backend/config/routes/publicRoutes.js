const publicRoutes = {
    'GET /login/google': 'AuthController.urlGoogle', 
    'POST /login/user': 'AuthController.authUser',

    'PUT /sold/user': 'SoldDataController.getAllForDisplay',
    'PUT /bought/user': 'BoughtDataController.getAllForDisplay',
};
module.exports = publicRoutes;
