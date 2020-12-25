<template>
    <div class="list-style-none">
        <div v-for="(i, k) in menu" :key="k">
            <div v-if="i.children && checkChildPerm(i.children)">
                <b-nav-item v-b-toggle="'app-sidebar-' + k">
                    {{ i.name }}
                    <span class="float-right">
                        <fa icon="chevron-down" />
                    </span>
                </b-nav-item>
                <b-collapse :id="'app-sidebar-' + k" class="pl-4">
                    <div v-for="(j, kk) in i.children" :key="kk">
                        <b-nav-item v-if="checkPerm(j.name)" :to="'/admin' + j.link">
                            <fa v-if="j.icon" class="mr-1" :icon="j.icon" />
                            {{ j.name }}
                        </b-nav-item>
                    </div>
                </b-collapse>
            </div>
            <div v-else>
                <b-nav-item v-if="checkPerm(i.name)" :to="'/admin' + i.link">
                    <fa v-if="i.icon" class="mr-1" :icon="i.icon" />
                    {{ i.name }}
                </b-nav-item>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    // data: () => ({
    //     menu: [
    //         { icon: null, name: 'Homepage', link: '/homepage' },
    //         { icon: null, name: 'Profile', link: '/profile', children: [
    //             { icon: null, name: 'Public Profile', link: '/profile/public-profile' },
    //             { icon: null, name: 'Vision Mission', link: '/profile/vision-mission' },
    //             { icon: null, name: 'Student Council', link: '/profile/student-council' },
    //             { icon: null, name: 'Extracurricular', link: '/profile/extracurricular' },
    //         ]},
    //         { icon: null, name: 'Study Program', link: '/study-program'},
    //         { icon: null, name: 'Information Media', link: '/information-media', children: [
    //             { icon: null, name: 'Agenda', link: '/information-media/agenda' },
    //             { icon: null, name: 'Prestation', link: '/information-media/prestation' },
    //             { icon: null, name: 'Gallery', link: '/information-media/gallery' },
    //         ]},
    //         { icon: null, name: 'Employees', link: '/employees' },
    //         { icon: null, name: 'User Management', link: '/user-management', children: [
    //             { icon: null, name: 'Users', link: '/user-management/users' },
    //             { icon: null, name: 'Role', link: '/user-management/role' },
    //         ]},
    //         { icon: null, name: 'Keywords', link: '/keywords' },
    //         { icon: null, name: 'Meta Tags', link: '/meta-tags' },
    //         { icon: null, name: 'Audits', link: '/audits' },
    //     ],
    //     access: null
    // }),
    // mounted(){
    //     var local = window.localStorage.getItem('user')

    //     if(local)
    //         this.access = JSON.parse(local).access
    // },
    methods: {
        checkPerm(str){
            const s = this.toKebab(str),
                a = Object.keys(this.access).filter(f => f.includes(s))

            return a.length
                ? (this.access[a[0]] === 1 || this.access[a[0]] === true) ?? false
                : false
        },
        checkChildPerm(arr, key){
            let a, b = []
            for(let i in arr){
                a = arr[i].name ? Object.keys(this.access).filter(f => f.includes(this.toKebab(arr[i].name))) : []

                if(a.length && this.access[a[0]]) b.push(a.length)
            }

            return b.length > 0
        },
        toKebab(str){
            return str.replace(/\s+/g, '-').toLowerCase()
        }
    },
    computed: {
        ...mapGetters(['menu', 'access'])
    }
}
</script>
