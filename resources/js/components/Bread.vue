<template>
    <header class="breadcrumb-area bg-bpi-blue">
        <div class="container h-100">
            <b-row class="h-100 align-items-center">
                <b-col cols="12">
                    <h2 class="page-title">{{ useBread ? bread[bread.length - 1].name : title }}</h2>
                    <p v-if="subTitle" class="text-white">{{ subTitle }}</p>
                    <b-breadcrumb>
                        <b-breadcrumb-item
                            v-for="(i, k) in bread"
                            :key="k"
                            :active="k + 1 === bread.length"
                        >
                            <span v-if="k + 1 === bread.length">
                                <strong class="text-decoration-underline">{{ i.name }}</strong>
                            </span>
                            <span
                                v-else-if="i.disable"
                                class="text-white cursor-default"
                            >{{ i.name }}</span>
                            <span v-else>
                                <router-link class="text-white" :to="i.to">{{ i.name }}</router-link>
                            </span>
                        </b-breadcrumb-item>
                    </b-breadcrumb>
                </b-col>
            </b-row>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        title: {
            default: null,
            required: false,
            type: String
        },
        useBread: {
            default: false,
            required: false,
            type: Boolean
        },
        subTitle: {
            requried: false,
            type: String
        },
        disable: {
            default: () => [],
            required: false,
            type: Array
        }
    },
    computed: {
        bread(){
            let obj = [],
                path = this.$route.path.split('/')

            path.shift()

            path.reduce((a, b, c) => {
                obj.push({
                    name: b.replace(/-/g, ' '),
                    to: a[c - 1] ? `/${a[c - 1].name}/${b}` : '/' + b,
                    disable: this.disable.length
                        ? this.disable[c] === c ? true : false
                        : false
                })

                return obj
            }, [])

            return obj
        }
    }
}
</script>
