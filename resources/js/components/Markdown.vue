<template>
    <vue-showdown v-if="ready" :markdown="content" :extensions="[data, 'result']" />
</template>

<script>
export default {
    props: {
        content: String
    },
    data: () => ({
        data: [],
        ready: false
    }),
    created(){
        this.keyword().then(r => {
            this.data = r

            this.$emit('mounted', r)
            this.ready = true
        })
    }
}
</script>
