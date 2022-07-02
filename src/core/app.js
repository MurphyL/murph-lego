module.exports = function (manifests) {
    if (Array.isArray(manifests.routes) && manifests.routes.length > 0) {
        const routes = {};
        const normalize = require('normalize-path');
        manifests.routes.forEach(route => {
            routes[normalize(`/${route.path}`)] = route;
        });
        const eventName = 'lego-route-change';
        const dispatchRouteChangeEvent = () => {
            document.dispatchEvent(new Event(eventName));
        };
        document.addEventListener(eventName, (event) => {
            console.log(`location: ${document.location}, state: ${JSON.stringify(event.state)}`)
        }, false);
        const current = normalize(location.pathname);
        if (routes[current]) {
            history.pushState({ success: true, payload: routes[current] }, null, current);
        } else {
            history.pushState({ success: false, code: 404 }, null, current);
        }
        dispatchRouteChangeEvent();
    }
};