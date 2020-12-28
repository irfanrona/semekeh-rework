<template>
    <div>
        <div class="col-md-12 navbar1">
            <div class="container">
                <ul class="justify-content-md-center">
                    <li class="cari mt-2 col-md-5">
                        <form method="get" @submit.prevent="search()">
                            <b-input-group>
                                <b-input-group-prepend>
                                    <b-btn type="submit" variant="bpi-blue">
                                        <fa icon="search" />
                                    </b-btn>
                                </b-input-group-prepend>
                                <b-form-input
                                    class="bg-bpi-blue text-light border-0"
                                    type="search"
                                    v-model="q"
                                    :placeholder="$t('search')"
                                />
                            </b-input-group>
                        </form>
                    </li>
                    <li class="sosmed col-md-5">
                        <a
                            v-for="(i, k) in social"
                            :key="k"
                            :href="i.link"
                            target="_blank"
                            rel="noopener"
                        >
                            <div class="nav-fb">
                                <fa :icon="['fab', i.icon]" />
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <b-navbar id="app-nav" type="dark" variant="white">
            <b-container>
                <div class="col-md-6">
                    <div class="px-0 logo">
                        <router-link :to="isLogged ? '/admin/homepage' : '/'">
                            <img :src="sauce('img/logo.webp')" :alt="appName" />
                        </router-link>
                    </div>
                </div>
                <app-nav-menu cls="menu" :data="menu" />
            </b-container>
        </b-navbar>

        <div class="navbar-responsive col-md-12" id="navbar-responsive">
            <div class="logo">
                <router-link :to="isLogged ? '/admin/homepage' : '/'">
                    <img :src="sauce('img/logo.webp')" :alt="appName" />
                </router-link>
            </div>
            <div class="bungkus-menu">
                <div
                    id="container"
                    class="menu-responsive"
                    :class="sideToggle ? 'change' : ''"
                    @click="sideToggle = !sideToggle"
                    v-b-toggle:app-mobile-nav
                >
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                </div>
            </div>
        </div>
        <b-collapse id="app-mobile-nav" class="sidenav">
            <app-nav-menu :cls="null" :data="menu" />
        </b-collapse>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import appNavMenu from './NavbarMenu'

export default {
    props: ['social'],
    components: {
        appNavMenu
    },
    data: () => ({
        sideToggle: false,
        q: '',
        menu: null,
    }),
    mounted(){
        let nav = this.getId('app-nav').style,
            main = this.getId('app-main').style

        if(document.documentElement.clientWidth > 1104)
            window.addEventListener('scroll', () => {

                if(document.documentElement.clientWidth > 1104)
                    this.scroll(nav, main)

                if(!this.isLogged){
                    let drop = [this.getId('app-nav-profile'), this.getId('app-nav-study'), this.getId('app-nav-media')]

                    drop.forEach(d => {
                        try{
                            this.setStyle(
                                d.style,
                                'absolute',
                                window.pageYOffset > 5 ? '25px' : '45px',
                                'auto'
                            )
                        }catch(e){}
                    })
                }
            })
        else
            nav.display = 'none'

        window.addEventListener('resize', e => {
            if(document.documentElement.clientWidth > 1104){
                nav.display = 'flex'
                this.scroll(nav, main)
            }else{
                nav.display = 'none'
                this.setStyle(main, 'inherit', '0px', 'auto')
            }
        })

        if(!this.isLogged)
            axios.get('navbar').then(r => this.menu = r.data)
    },
    methods: {
        setStyle(s, ...styles){
            s.position = styles[0]
            s.marginTop = styles[1]
            s.height = styles[2]
        },
        search(){
            if (this.q != "") {
                if (this.$router.currentRoute.name === "search")
                    this.$router.replace({ query: { q: this.q } })
                else
                    this.$router
                        .push({
                            path: "/search",
                            query: { q: this.q }
                        })
                        .catch(() => {})
            }
        },
        scroll(nav, main){
            if(window.pageYOffset > 5){
                    this.setStyle(nav, 'fixed', '-56px', '80px')
                    this.setStyle(main, 'inherit', '80px', 'auto')
            }else{
                this.setStyle(nav, 'none', '0px', '120px')
                this.setStyle(main, 'inherit', '120px', 'auto')
            }
        }
    },
    computed: {
        ...mapGetters(['isLogged'])
    },
    watch: {
        isLogged(a){
            if(a === false)
                axios.get('navbar').then(r => this.menu = r.data)
        }
    }
}
</script>
