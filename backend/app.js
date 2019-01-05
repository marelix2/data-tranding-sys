var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//var logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');

const config = require('./config/');
const dbService = require('./api/services/db.service');

const environment = 'development';

console.log(`\n\n Server is running on: localhost:${config.port} \n\n`);

const app = express();
const server = http.Server(app);
const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');
const mappedAuthRoutes = mapRoutes(config.privateRoutes, 'api/controllers/');
const DB = dbService(environment, config.migrate).start();

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// fill routes for express appliction
app.use(`${config.apiPath}/public`, mappedOpenRoutes);
app.use(`${config.apiPath}/private`, mappedAuthRoutes);

server.listen(config.port, () => {
    if (environment !== 'production' &&
        environment !== 'development' &&
        environment !== 'testing'
    ) {
        console.log(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
        process.exit(1);
    }
    return DB;
});
require('./api/models/Category');
require('./api/models/Description');
require('./api/models/Tag');
require('./api/models/Role');
require('./api/models/User');
require('./api/models/Wallet');
require('./api/models/BoughtData');
require('./api/models/SoldData');
require('./api/models/Email');
require('./api/models/Company');
require('./api/models/RowStatus');
require('./api/models/ExploredTag');


module.exports = app;

