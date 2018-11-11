const HttpStatus = require('http-status-codes');

class GoogleErrorDTO {
    constructor(header = HttpStatus.INTERNAL_SERVER_ERROR, message = 'Undefined error!') {
        this.header = Number.isInteger(header) ? HttpStatus.getStatusText(header) : header;
        this.message = message;
    }
};

module.exports = GoogleErrorDTO;