import Vue from 'vue'
import Vuex from 'vuex'

import { auth, alert } from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth, alert
    }
})
