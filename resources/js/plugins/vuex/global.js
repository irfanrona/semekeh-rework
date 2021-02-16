export default {
    state: {
        global: {}
    },
    mutations: {
        setGlobal(s, { name, data }) {
            s.global[name] = data
        }
    },
    actions: {
        setGlobal: ({ commit }, data) => commit('setGlobal', data)
    },
    getters: {
        global: s => s.global
    }
}
