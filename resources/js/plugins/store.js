import Vue from 'vue'
import Vuex from 'vuex'

import { auth, alert, global, media, welcome } from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth, alert, global, media, welcome
    }
})
