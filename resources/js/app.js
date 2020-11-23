require('./bootstrap')

window.Vue = require('vue')

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueFormulate from '@braid/vue-formulate'
import VueRecaptcha from 'vue-recaptcha'
import VueShowdown from 'vue-showdown'
import i18n from './plugins/lang'
import router from './plugins/router'
import { helper, icon, store, formulate } from './plugins'

import App from './components/App'
import DataTable from './components/DataTable'
import Create from './components/Create'
import Markdown from './components/Markdown'
import InputMark from './components/InputMark'
import Share from './components/Share'
import Img from './components/Img'

require('./plugins/markdown')

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueFormulate, formulate)
Vue.use(helper)
Vue.use(VueShowdown, { flavor: 'github' })

Vue.component('fa', icon)
Vue.component('data-table', DataTable)
Vue.component('create', Create)
Vue.component('recaptcha', VueRecaptcha)
Vue.component('markdown', Markdown)
Vue.component('input-markdown', InputMark)
Vue.component('share', Share)
Vue.component('v-img', Img)

new Vue({
    i18n,
    router,
    store,
    created() {
        const info = localStorage.getItem('user')

        if (info)
            this.$store.commit('setUser', JSON.parse(info))
    },
    render: r => r(App),
}).$mount('#app')
