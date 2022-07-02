module.exports = function (manifests) {
    const { log } = require('../support/notice.js');
    if (manifests.router) {
        const render = require('../support/render.js');
        const { routes, single, path } = manifests.router;
        // const current = normalize(location.pathname);
        const rules = {};
        const pathx = require('path');
        if (Array.isArray(routes) && routes.length > 0) {
            routes.forEach(route => {
                rules[pathx.normalize(['/', path, route.path].join('/'), true)] = route;
            });
        }
        const current = pathx.normalize(location.pathname, true);
        if (single) {
            log.debug('SPA 应用', rules, current);
        } else {
            log.debug('传统 JavaScript 应用', rules, current);
            render('#app', rules[current] || { component: 'Error', code: 404 });
        }
    }
};