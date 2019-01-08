const privateRoutes = require('./routes/privateRoutes');
const publicRoutes = require('./routes/publicRoutes');

const config = {
    migrate: false,
    apiPath: '/api',
    privateRoutes,
    publicRoutes,
    port: process.env.PORT || '6969',
};

module.exports = config;