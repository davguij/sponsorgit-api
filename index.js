'use strict';

const mycro = require('./app');
mycro.start(function (err) {
    if (err) {
        mycro.log('error', 'there was an error starting sponsorgit-api:', err);
    } else {
        mycro.log('info', 'sponsorgit-api started successfully');
    }
});
