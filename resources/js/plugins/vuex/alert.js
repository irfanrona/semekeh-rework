export default {
    namespaced: true,
    state: {
        toast: null,
        title: '',
        text: '',
        color: null,
        location: null
    },
    mutations: {
        set(s, data) {
            data.toast.toast(data.text, {
                title: data.title,
                variant: data.color,
                toaster: data.location ?? 'b-toaster-bottom-center'
            })
        }
    },
    actions: {
        set: ({ commit }, data) => commit('set', data)
    },
}
