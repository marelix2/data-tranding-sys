const HttpStatus = require('http-status-codes');

class ErrorDTO {
    constructor(header = HttpStatus.INTERNAL_SERVER_ERROR, message = 'Undefined error!') {
        this.header = Number.isInteger(header) ? HttpStatus.getStatusText(header) : header;
        this.message = message;
    }
};

module.exports = ErrorDTO;