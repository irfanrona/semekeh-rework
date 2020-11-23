<template>
    <b-col v-if="data || isLogged" :md="cls ? 6 : 12" sm="12">
        <ul v-if="isLogged" :class="cls">
            <li>
                <a class="dropbtn" href="#" v-b-toggle:app-sidebar @click.prevent>
                    <fa v-if="cls !== null" icon="bars" />
                    <span v-if="cls === null">{{ $t("menu") }}</span>
                </a>
            </li>
            <!-- we will keep this shit, if <li></li> removed the fking sidebar will not working -->
            <li></li>
            <li>
                <router-link class="dropbtn" to="/admin/homepage">Homepage</router-link>
            </li>
            <li>
                <router-link class="dropbtn" to="/admin/my-profile">{{ user.name }}</router-link>
            </li>
        </ul>
        <ul v-else :class="cls">
            <li v-if="cls === null" class="cari">
                <b-input-group>
                    <b-input-group-prepend>
                        <a class="btn btn-white" href="#">
                            <fa icon="search" class="search" />
                        </a>
                    </b-input-group-prepend>
                    <input type="text" :placeholder="$t('search')" />
                </b-input-group>
            </li>
            <li>
                <router-link class="dropbtn" to="/employees">{{ $t("navbar.employees") }}</router-link>
            </li>
            <li>
                <a
                    class="dropbtn"
                    :class="mediaa()"
                    href="#"
                    v-b-toggle:app-nav-media
                    @click.prevent="clicked('a')"
                >
                    {{ $t("navbar.media") }}
                    <fa v-if="cls === null" :icon="toggle('a')" class="float-right" />
                </a>
                <div v-if="cls" id="app-nav-media" class="dropdown-content">
                    <router-link
                        v-for="(i, k) in media"
                        :key="k"
                        class="dropdown-item"
                        :to="'/information-media/' + i"
                    >{{ $t("navbar.medias." + i) }}</router-link>
                </div>
                <b-collapse v-else id="app-nav-media">
                    <router-link
                        v-for="(i, k) in media"
                        :key="k"
                        class="dropdown-item-responsive"
                        :to="'/information-media/' + i"
                    >{{ $t("navbar.medias." + i) }}</router-link>
                </b-collapse>
            </li>
            <li>
                <a
                    class="dropbtn"
                    :class="$route.name === 'study' ? 'active' : ''"
                    href="#"
                    v-b-toggle:app-nav-study
                    @click.prevent="clicked('b')"
                >
                    {{ $t("navbar.study") }}
                    <fa v-if="cls === null" :icon="toggle('b')" class="float-right" />
                </a>
                <div v-if="cls" id="app-nav-study" class="dropdown-content">
                    <router-link
                        v-for="(i, k) in data.study"
                        :key="k"
                        class="dropdown-item"
                        :to="'/study-program/' + i.slug"
                    >{{ i.title }}</router-link>
                </div>
                <b-collapse v-else id="app-nav-study">
                    <router-link
                        v-for="(i, k) in data.study"
                        :key="k"
                        class="dropdown-item-responsive"
                        :to="'/study-program/' + i.slug"
                    >{{ i.title }}</router-link>
                </b-collapse>
            </li>
            <li>
                <a
                    class="dropbtn"
                    :class="$route.name === 'profile' ? 'active' : ''"
                    href="#"
                    v-b-toggle:app-nav-profile
                    @click.prevent="clicked('c')"
                >
                    {{ $t("navbar.profile") }}
                    <fa v-if="cls === null" :icon="toggle('c')" class="float-right" />
                </a>
                <div v-if="cls" id="app-nav-profile" class="dropdown-content">
                    <router-link
                        v-for="(i, k) in profile"
                        :key="k"
                        class="dropdown-item"
                        :to="'/profile/' + i"
                    >{{ $t("navbar.profiles." + i.replace(/-/g, '_')) }}</router-link>
                    <a
                        class="dropdown-item"
                        :href="data.bpi"
                        target="_blank"
                        rel="noopener"
                    >{{ $t("navbar.profiles.foundation") }}</a>
                </div>
                <b-collapse v-else id="app-nav-profile">
                    <router-link
                        v-for="(i, k) in profile"
                        :key="k"
                        class="dropdown-item-responsive"
                        :to="'/profile/' + i"
                    >{{ $t("navbar.profiles." + i.replace(/-/g, '_')) }}</router-link>
                    <a
                        class="dropdown-item-responsive"
                        :href="data.bpi"
                        target="_blank"
                        rel="noopener"
                    >{{ $t("navbar.profiles.foundation") }}</a>
                </b-collapse>
            </li>
        </ul>
    </b-col>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: ['cls'],
    data: () => ({
        c: {
            a: false,
            b: false,
            c: false
        },
        profile: ['public', 'vision-mission', 'student-council', 'extracurricular'],
        media: ['agenda', 'prestations', 'galleries'],
        data: null
    }),
    mounted(){
        if(!this.isLogged)
            axios.get('navbar').then(r => this.data = r.data)
    },
    methods: {
        clicked(key){
            this.c[key] = !this.c[key]
        },
        toggle(key){
            return this.c[key] === false
                ? 'chevron-down'
                : 'chevron-up'
        },
        mediaa(){
            let a = ''

            this.media.forEach(e => {
                if('media-' + e === this.$route.name || 'media-agenda-detail' === this.$route.name)
                    a = 'active'
            })

            return a
        }
    },
    computed: {
        ...mapGetters(['isLogged', 'user']),
    },
    watch: {
        isLogged(a){
            if(a === false)
                axios.get('navbar').then(r => this.data = r.data)
        }
    }
}
</script>
