<template>
    <div class="text-center" style="min-height: 100px">
        <img :src="src" :alt="altName" class="img-fluid" v-show="loaded" @load="loader()" />
        <b-spinner v-show="!loaded" class="my-2" variant="bpi-blue" />
    </div>
</template>

<script>
export default {
    props: {
        src: {
            required: true,
            type: String
        },
        alt: String
    },
    data: () => ({
        loaded: false,
    }),
    methods: {
        loader(){
            this.loaded = true
        }
    },
    computed: {
        altName(){
            return this.alt || this.appName
        }
    }
}
</script>
