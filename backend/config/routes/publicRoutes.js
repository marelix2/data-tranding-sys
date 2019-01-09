const publicRoutes = {
    'GET /login/google': 'AuthController.urlGoogle',
    'POST /login/user': 'AuthController.authUser',

    'PUT /sold/user': 'SoldDataController.getAllForDisplay',
    'PUT /sold/progress': 'SoldDataController.getInProgressForDisplay',
    'PUT /sold/user/progress': 'SoldDataController.getUserInProgress',
    'PUT /sold/user/transaction': 'SoldDataController.getTransactionData',
    'PUT /sold/user/delete/data': 'SoldDataController.DeleteRecord',
    'PUT /sold/user/delete/table': 'SoldDataController.DeleteTable',
    'PUT /sold/user/accept/table': 'SoldDataController.AcceptTable',

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

    'PUT /admin/categories': 'AdminController.getCategories',
    'PUT /admin/tags': 'AdminController.getTags',
    'PUT /admin/tag/update': 'AdminController.updateTagValue',

    'PUT /buy/user/table': 'BuyDataController.addTableToCart',
    'PUT /buy/user/table/emails': 'BuyDataController.getAllInProgressEmails',
    'PUT /buy/user/table/companies': 'BuyDataController.getAllInProgressCompanies', 
    'PUT /buy/user/table/clear' : 'BuyDataController.deleteInProgressTables',
    'PUT /buy/user/table/confirmed': 'BuyDataController.transactionTableConfirmed',
    
};
module.exports = publicRoutes;
