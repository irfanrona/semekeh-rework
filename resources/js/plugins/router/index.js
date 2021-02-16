import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './router'

Vue.use(VueRouter)

const router = new VueRouter({
    history: true,
    mode: 'history',
    linkActiveClass: 'active',
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash)
            return { selector: to.hash }
        else
            return savedPosition || { x: 0, y: 0 }
    },
})

router.beforeEach((to, from, next) => {
    const logged = localStorage.getItem('user')

    if (to.matched.some(r => r.meta.auth) && !logged)
        return next('/404')
    else if (to.matched.some(r => r.meta.auth === false) && logged)
        return next('/admin/homepage')

    return next()
})

export default router
