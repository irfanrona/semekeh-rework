export default {
    install(Vue, options) {
        Vue.mixin({
            data: () => ({
                appName: process.env.MIX_APP_NAME,
                appURL: process.env.MIX_APP_URL
            }),
            methods: {
                /**
                 * Return url
                 * 
                 * @param {string} path 
                 * 
                 * @return {string}
                 */
                sauce(path = '') {
                    return process.env.MIX_APP_URL + (
                        path !== '' ? `/${path}` : ''
                    )
                },

                /**
                 * If you want link "active"
                 * use this function with route name.
                 * 
                 * @param {string} name 
                 * 
                 * @return {object}
                 */
                link(name = '') {
                    return { name: name }
                },

                /**
                 * Shorten getElementById.
                 * 
                 * @param {string} id 
                 * 
                 * @return {object}
                 */
                getId(id) {
                    return document.getElementById(id)
                },

                /**
                 * Shorten catch error process.
                 * 
                 * @param {object} e 
                 */
                catchErr(e) {
                    if (e.response.status === 422) {
                        const h = this.$createElement
                        let txt = []

                        Object.values(e.response.data).forEach(o => txt.push(h('p', o)))

                        this.$store.dispatch('alert/set', {
                            toast: this.$bvToast,
                            title: this.$t('errors.error'),
                            text: h('div', txt),
                            color: 'danger'
                        })
                    } else this.$store.dispatch('alert/set', {
                        toast: this.$bvToast,
                        title: this.$t('errors.server'),
                        text: this.$t('errors.server_detail'),
                        color: 'danger'
                    })
                },

                /**
                 * This keyword used for markdown.
                 * 
                 * @return {object} Promise
                 */
                keyword() {
                    return new Promise(async dispatch => {
                        let result = []

                        await axios.get('keyword').then(r =>
                            r.data.forEach(d => result.push({
                                type: 'lang',
                                regex: new RegExp(d.key, 'g'),
                                replace: d.value,
                                origin_key: d.key
                            }))
                        )

                        dispatch(result)
                    })
                },

                /**
                 * Inspect FormData.
                 *
                 * @param {FormData} form
                 */
                logForm(form) {
                    for (var pair of form.entries())
                        console.log(pair[0], pair[1])
                }
            }
        })
    }
}
