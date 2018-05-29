import * as util from 'util';
import * as http from 'http';

export class HttpError {
    status;
    message;
    constructor(message, status) {
        util.inherits(this.HttpError, Error);
        this.HttpError.prototype.name = 'HttpError';
    }

    HttpError(status, message) {
        Error.apply(this, arguments);
        Error.captureStackTrace(this, this.HttpError);

        this.status = status;
        this.message = message || http.STATUS_CODES[status] || "Error";
        return Error;
    }
}