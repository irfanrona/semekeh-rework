import axios from 'axios'

export default {
    state: {
        user: null,
    },
    mutations: {
        setUser(state, data) {
            state.user = data

            localStorage.setItem('user', JSON.stringify(data))
            axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
        },
        clearUser(state) {
            localStorage.removeItem('user')
            state.user = null
        },
        update(state, data) {
            let a = JSON.parse(localStorage.getItem('user'))
            a.user = data.user
            a.access = data.access

            localStorage.setItem('user', JSON.stringify(a))
        }
    },
    actions: {
        login({ commit }, data) {
            axios.get('sanctum/csrf-token', { withCredentials: true })

            return axios.post('auth/login', data)
                .then(({ data }) => commit('setUser', data))
        },
        logout: ({ commit, state }) => axios.post(`auth/logout/${state.user.user.id}`)
            .then(() => commit('clearUser')),
        getUser: ({ commit }) => axios.post(`admin/auth`)
            .then(({ data }) => commit('update', data))
    },
    getters: {
        isLogged: state => !!state.user,
        access: s => !!s.user ? s.user.access : null,
        menu: s => !!s.user ? s.user.menu : null,
        user: s => !!s.user ? s.user.user : null
    }
}