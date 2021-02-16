export default {
    state: {
        media: {}
    },
    mutations: {
        setMedia(s, { name, data }) {
            s.media[name] = data
        }
    },
    actions: {
        setMedia: ({ commit }, data) => commit('setMedia', data)
    },
    getters: {
        media: s => s.media
    }
}
