export default {
    state: {
        welcome: null
    },
    mutations: {
        setWelcome(s, data) {
            s.welcome = data
        }
    },
    actions: {
        setWelcome: ({ commit }, data) => commit('setWelcome', data)
    },
    getters: {
        welcome: s => s.welcome
    }
}
