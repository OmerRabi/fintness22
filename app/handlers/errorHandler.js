const ErrorMessage = require('../config/errorsMessage');
const costumeError = (statusCode = "E03C500") => {
    const err = ErrorMessage[statusCode]
    const error = new Error(err.message);

    console.error(`error: ` + JSON.stringify(error));

    error.errorCode = err.errorCode;
    error.statusCode = err.statusCode;
    error.success = err.success;

    throw error;
}




module.exports = costumeError;