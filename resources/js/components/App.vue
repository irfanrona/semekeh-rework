<template>
    <div>
        <app-navbar :social="social" />

        <b-sidebar v-if="isLogged" id="app-sidebar" backdrop right>
            <app-sidebar />

            <template #footer="{ hide }">
                <div class="text-center p-3">
                    <a class="text-bpi-blue text-decoration-none" href="#" @click.prevent="logout(hide)">
                        <strong>{{ $t("logout") }}</strong>
                    </a>
                </div>
            </template>
        </b-sidebar>

        <main id="app-main" :class="isLogged ? 'px-0' : ''">
            <transition
                name="fade"
                mode="out-in"
                @beforeLeave="before"
                @enter="enter"
                @afterEnter="after"
            >
                <router-view />
            </transition>
        </main>

        <app-footer :social="social" :footer="footer" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'
import Sidebar from './layouts/Sidebar'

export default {
    components: {
        appNavbar: Navbar,
        appFooter: Footer,
        appSidebar: Sidebar,
    },
    data: () => ({
        social: [],
        footer: []
    }),
    mounted(){
        axios.get('social').then(r => {
            this.social = r.data.social
            this.footer = r.data.footer
        })
    },
    methods: {
        before(el) {
            this.height = getComputedStyle(el).height
        },
        enter(el) {
            const { height } = getComputedStyle(el)

            el.style.height = this.height
            setTimeout(() => {
                el.style.height = height
            })
        },
        after(el) {
            el.style.height = 'auto'
        },
        logout(hide){
            hide()
            this.$store.dispatch('logout')
                .then(() => {
                    this.$router.push('/')
                    console.clear()
                })
        },
    },
    computed: {
        ...mapGetters(['isLogged'])
    }
}
</script>
