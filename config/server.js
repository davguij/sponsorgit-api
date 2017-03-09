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
        'request-all-params',
        // define some custom middleware
        function cors(mycro) {
            return mycro._restify.CORS({
                origins: ['*'] // defaults to ['*']
                // credentials: true, // defaults to false
                // headers: ['x-foo'] // sets expose-headers
            });
        },

    ]
};
