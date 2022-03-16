const statusMessages = {
    '200': 'Ok',
    '201': 'Created',
    '204': 'No content',
    '400': 'Invalid format',
    '401': 'Unauthorized',
    '403': 'Forbidden',
    '404': 'Not found',
    '406': 'Not acceptable',
    '500': 'Internal error'
}


/**
 * Parse succes http response
 * @param req Request
 * @param res Response
 * @param status Status code
 * @param message Message
 */
function success(req, res, status, message) {
    let statusMessage = message;

    if (!message) {
        statusMessage = statusMessages[status];
    }

    res.status(status).send(message);
}


/**
 * Parse error http response
 * @param req Request
 * @param res Response
 * @param status Status code
 * @param message Message
 * @param details Message details
 */
function error(req, res, status, message) {
    let statusMessage = message;
    
    if (!message) {
        statusMessage = statusMessages[status];
    }

    res.status(status || 500).send({ 
        status: statusMessage
    });
}

module.exports = {
    success,
    error
}