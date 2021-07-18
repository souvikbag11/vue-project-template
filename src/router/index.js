import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [];

const addRoutes = (availableRoutes) => {
    availableRoutes.keys().forEach(fileName => {
        const availableRoute = availableRoutes(fileName)
        routes = routes.concat(availableRoute.default || availableRoute)
    });
}

const availableUiModulesRoutesList = require.context('../ui-modules', true, /(.route.js|.route.ts)$/)
const availableCoreRoutesList = require.context('.', true, /(.route.js|.route.ts)$/)
addRoutes(availableUiModulesRoutesList);
addRoutes(availableCoreRoutesList);

const router = new VueRouter({
    routes
})

export default router
