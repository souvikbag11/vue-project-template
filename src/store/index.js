import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep';
import forOwn from 'lodash/forOwn';
import camelCase from 'lodash/camelCase'

Vue.use(Vuex)

const modules = {};

/**
 * Get all files ending with .store.ts or .store.js
 * Extract name from {filename}.store.ts
 * register module with {filename}
 */

const addStoreModules = (availableStores) => {
    availableStores.keys().forEach(fileName => {
        const availableStore = availableStores(fileName)
        const storeName = camelCase(fileName.split('/').pop().replace(/\.(.*)/, ''))
        modules[storeName] = availableStore.default || availableStore;
    });
}

const availableUiModuleStoresList = require.context('../ui-modules', true, /(.store.js|.store.ts)$/)
const availableCoreStoresList = require.context('.', true, /(.store.js|.store.ts)$/)
addStoreModules(availableUiModuleStoresList)
addStoreModules(availableCoreStoresList)

/**
 * Call this.$store.commit('resetState') to reset all the states without crashing
 */
export default new Vuex.Store({
    modules: cloneDeep(modules),
    mutations: {
        resetState(state) {
            forOwn(modules, (value, key) => {
                state[key] = cloneDeep(value.state);
            });
        },
    }
})
