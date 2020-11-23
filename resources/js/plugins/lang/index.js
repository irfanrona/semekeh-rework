import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './en'
import id from './id'

Vue.use(VueI18n)

export default new VueI18n({
    // locale: document.documentElement.lang,
    locale: 'id',
    messages: {
        en, id
    }
})
