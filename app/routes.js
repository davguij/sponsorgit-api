'use strict';
/* eslint-disable */
module.exports = function (mycro) {
    /* eslint-enable */
    return {
        'v1.0.0': {
            '/healthy': {
                get(req, res) {
                    res.json(200, { status: 'healthy' });
                }
            },
            '/repos': {
                get: 'github.getRepos',
                '/:owner/:repo': {
                    get: 'github.getRepoDetails',
                    '/languages': {
                        get: 'github.getRepoLangs'
                    },
                    '/sponsors': {
                        get: 'sponsors.getAll'
                    }
                }
            }
        }
    };
};
