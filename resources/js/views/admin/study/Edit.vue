<template>
    <div v-if="data" class="my-4">
        <b-container>
            <b-card>
                <formulate-form @submit="send()">
                    <b-row>
                        <b-col cols="6">
                            <formulate-input
                                type="text"
                                :label="$t('title')"
                                v-model="data.title"
                                validation="required"
                            />
                        </b-col>
                        <b-col cols="6">
                            <formulate-input
                                type="image"
                                :label="$t('banner')"
                                v-model="data.banner"
                                accept="image/jpg, image/jpeg, image/png, image/webp"
                            />
                            <v-img :src="sauce('storage/' + data.bannerP)" />
                        </b-col>
                    </b-row>
                    <formulate-input
                        type="markdown"
                        :label="$t('content')"
                        v-model="data.content"
                        validation="required"
                    />
                    <h2 class="my-4">{{ $t('facility') }}</h2>
                    <b-row class="my-2">
                        <b-col cols="6">
                            <formulate-input
                                type="text"
                                :label="$t('title')"
                                v-model="data.title_2"
                                validation="required"
                            />
                        </b-col>
                        <b-col cols="6">
                            <formulate-input
                                type="image"
                                :label="$t('image')"
                                v-model="data.url"
                                accept="image/jpg, image/jpeg, image/png, image/webp"
                            />
                            <v-img :src="sauce('storage/' + data.urlP)" />
                        </b-col>
                    </b-row>
                    <formulate-input
                        type="markdown"
                        :label="$t('content')"
                        v-model="data.content_2"
                        validation="required"
                    />
                    <formulate-input :label="$t('update')" type="submit" :disabled="clicked">
                        <b-spinner v-if="clicked" variant="primary" small />
                    </formulate-input>
                </formulate-form>
            </b-card>
        </b-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        data: null,
        clicked: false
    }),
    mounted(){
        if(this.access['study-program.update']){
            const a = localStorage.getItem('study')

            if(a){
                const b = JSON.parse(a)

                if(this.$route.params.slug === b.slug)
                    this.setData(b)
                else this.render()
            }else this.render()
        }else this.$router.push('/404')
    },
    methods: {
        render(){
            axios.get('admin/study/edit/' + this.$route.params.slug)
                .then(r => {
                    if(r.data){
                        this.setData(r.data)
                        localStorage.setItem('study', JSON.stringify(r.data))
                    }else this.$router.push('/404')
                })
        },
        setData(obj){
            const a = JSON.parse(obj.content_2)

            this.data = {
                banner: null,
                url: null,
                bannerP: obj.banner,
                urlP: a.url,
                title: obj.title,
                content: obj.content,
                title_2: a.title,
                content_2: a.content,
                id: obj.id
            }
        },
        send(){
            const form = new FormData,
                f = this.data

            this.clicked = true

            Object.keys(f).forEach(o => {
                if((o === 'banner' && f.banner !== null) || (o === 'url' && f.banner !== null))
                    form.append(o, f[o].fileList[0])
                else{
                    if(o !== 'banner' && o !== 'url')
                        form.append(o, f[o])
                }
            })

            axios.post('/admin/study/update/' + f.id, form)
                .then(r => {
                    this.clicked = false

                    this.$store.dispatch('alert/set', {
                        toast: this.$bvToast,
                        title: this.$t('success'),
                        text: r.data.message,
                        color: 'success'
                    })

                    this.$router.push('/admin/study-program')
                })
                .catch(e => {
                    this.catchErr(e)
                    this.clicked = false
                })
        }
    },
    computed: {
        ...mapGetters(['access']),
    },
    destroyed(){
        localStorage.removeItem('study')
    }
}
</script>
