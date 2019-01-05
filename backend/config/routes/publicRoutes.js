const publicRoutes = {
    'GET /login/google': 'AuthController.urlGoogle', 
    'POST /login/user': 'AuthController.authUser',

    'PUT /sold/user': 'SoldDataController.getAllForDisplay',
    'PUT /bought/user/emails': 'BoughtDataController.getAllForDisplayEmails',
    'PUT /bought/user/companies': 'BoughtDataController.getAllForDisplayCompanies',
    'PUT /bought/user/number': 'BoughtDataController.getNumberOfTables',

    'PUT /wallet/user/current': 'WalletController.getUserCurrent',
    
    'PUT /home/user/explored/path': 'ExploredTagsController.updateExploredTag',
    'PUT /home/user/explored': 'ExploredTagsController.getTagsForDisplay',
    

    'PUT /explored/emails': 'ExploredController.getEmailTagsForDisplay',
    'PUT /explored/companies': 'ExploredController.getCompaniesTagsForDisplay',
    'PUT /explored/data/example': 'ExploredController.getExampleDataForDisplay',
    'PUT /explored/data/province': 'ExploredController.getTagProvincesForDisplay',
    'PUT /explored/data/description': 'ExploredController.getTagDescription',
    
};
module.exports = publicRoutes;
