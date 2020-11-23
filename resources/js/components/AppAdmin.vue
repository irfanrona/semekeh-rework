<template>
    <div>
        <header class="breadcrumb-area bg-bpi-blue">
            <div class="container h-100">
                <b-row class="h-100 align-items-center">
                    <b-col cols="12">
                        <h2 class="page-title">{{ bread[bread.length - 1].name.replace(/-/g, ' ') }}</h2>
                        <b-breadcrumb>
                            <b-breadcrumb-item
                                v-for="(i, k) in bread"
                                :key="k"
                                :active="k + 1 === bread.length"
                            >
                                <span v-if="k + 1 === bread.length">
                                    <strong
                                        class="text-decoration-underline"
                                    >{{ i.name.replace(/-/g, ' ') }}</strong>
                                </span>
                                <span v-else>
                                    <router-link
                                        class="text-white"
                                        :to="i.to"
                                    >{{ i.name.replace(/-/g, ' ') }}</router-link>
                                </span>
                            </b-breadcrumb-item>
                        </b-breadcrumb>
                    </b-col>
                </b-row>
            </div>
        </header>
        <transition
            name="fade"
            mode="out-in"
            @beforeLeave="before"
            @enter="enter"
            @afterEnter="after"
        >
            <router-view />
        </transition>
    </div>
</template>

<script>
export default {
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
    },
    computed: {
        bread(){
            let obj = [],
                temp = '',
                path = this.$route.path.split('/')

            path.shift()
            path.forEach(e => {
                temp += '/' + e

                obj.push({
                    name: e,
                    to: temp
                })
            })

            return obj
        }
    }
}
</script>
