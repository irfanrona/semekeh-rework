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
        const key = localStorage.getItem('keyword')

        if(key){
            const json = JSON.parse(key)

            this.data = json.map(i => ({
                ...i,
                regex: new RegExp(i.origin_key, 'g')
            }))
            this.$emit('mounted', this.data)
            this.ready = true
        }else this.keyword().then(r => {
            let obj = r

            this.data = r

            this.$emit('mounted', r)
            this.ready = true

            localStorage.setItem('keyword', JSON.stringify(r))
        })
    }
}
</script>
