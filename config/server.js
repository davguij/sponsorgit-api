'use strict';

module.exports = {
    port: process.env.PORT || 8080,
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
