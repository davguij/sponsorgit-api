'use strict';

module.exports = function (mycro) {
    return {
        'v1.0.0': {
            '/healthy': {
                get(req, res) {
                    res.json(200, { status: 'healthy' });
                }
            },
            '/repos': {
                get: 'github.getRepos'
            }
        }
    };
};
