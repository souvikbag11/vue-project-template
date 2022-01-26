import Vue from "vue";
import store from './store'
import router from './router'
import cloneDeep from "lodash/cloneDeep";
import forOwn from "lodash/forOwn";
import {camelCase, kebabCase} from "lodash";

/**
 * Dynamically Load Module Config data
 */
const availableModuleConfigs = require.context('./modules', true, /(.config.js|.config.ts)$/)
const availableModules = {}
availableModuleConfigs.keys().forEach(fileName => {
  const availableConfig = availableModuleConfigs(fileName)
  const moduleName = camelCase(fileName.split('/').pop().replace(/\.(.*)/, ''))
  const moduleConfigData = (availableConfig.default || availableConfig)
  if (!moduleConfigData.exclude) {
    availableModules[moduleName] = moduleConfigData
    /**
     * This allows global component registration and component sharing
     * every module can export certain components
     * naming convection will be kebabCase [module-name-my-component-name]
     * to allow dynamic exclusion check if component exist using
     * $options.components['todos-fancy-box'] if exist then proceed else skip the render
     */
    if (moduleConfigData.components) {
      moduleConfigData.components.map((data) => {
        Vue.component(
          kebabCase(`${moduleName}-${data.name}`),
          data.component
        )
      })
    }
  }
})

/**
 * Get all files ending with .store.ts or .store.js
 * Extract name from {filename}.store.ts
 * register module with {filename}
 */
const addStoreModules = (availableStores) => {
  availableStores.keys().forEach(fileName => {
    const moduleName = camelCase(fileName.split('/').pop().replace(/\.(.*)/, ''))
    if (!availableModules[moduleName]) {
      return;
    }
    const availableStore = availableStores(fileName)
    store.registerModule(moduleName, availableStore.default || availableStore)
  });
}

addStoreModules(require.context('./modules', true, /.(store.js|store.ts)$/))
addStoreModules(require.context('./store', true, /.(store.js|store.ts)$/))

/**
 * Get all files ending with .route.ts or .route.js
 * Extract name from {filename}.route.ts
 * register route
 *
 * Dynamic exclusion isn't working thus need to validate while adding
 * (?<!/todos)\.(route.js|route.ts)$
 */
const addRoutes = (availableRoutes) => {
  availableRoutes.keys().forEach(fileName => {
    const moduleName = camelCase(fileName.split('/').pop().replace(/\.(.*)/, ''))
    if (!availableModules[moduleName]) {
      return;
    }
    const availableRoute = availableRoutes(fileName);
    (availableRoute.default || availableRoute).map((r) => router.addRoute(r))
  });
}
addRoutes(require.context('./modules', true, /.(route.js|route.ts)$/));
addRoutes(require.context('./router', true, /.(route.js|route.ts)$/));


/**
 * Call this.$store.commit('resetState') to reset all the states without crashing
 * @defaultState copies the data in current
 */
const defaultState = cloneDeep(store.state);
store.hotUpdate({
  getters: {
    availableModules() {
      return availableModules;
    }
  },
  mutations: {
    resetState(state) {
      forOwn(defaultState, (value, key) => {
        state[key] = cloneDeep(value);
      });
    },
  }
})

