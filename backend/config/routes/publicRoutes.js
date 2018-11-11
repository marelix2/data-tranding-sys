const publicRoutes = {
    'GET /login/google': 'AuthController.urlGoogle', 
    'POST /login/user': 'AuthController.authUser',
};
module.exports = publicRoutes;
