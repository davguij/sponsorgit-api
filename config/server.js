'use strict';

module.exports = {
    port: 8080,
    middleware: [
        'acceptParser',
        'dateParser',
        'queryParser',
        'bodyParser',
        'morgan',
        'request',
        'request-all-params'
    ]
};
