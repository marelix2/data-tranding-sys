const publicRoutes = {
    'GET /login/google': 'AuthController.urlGoogle', 
    'POST /login/user': 'AuthController.authUser',

    'PUT /sold/user': 'SoldDataController.getAllForDisplay',
    'PUT /bought/user/emails': 'BoughtDataController.getAllForDisplayEmails',
    'PUT /bought/user/companies': 'BoughtDataController.getAllForDisplayCompanies',
};
module.exports = publicRoutes;
