<template>
    <div>
        <bread :title="$t('navbar.medias.galleries')" />

        <b-container v-if="ready" class="my-4">
            <b-card-group columns id="ehe">
                <b-card
                    v-for="(i, k) in nanii"
                    class="img-view"
                    :key="k"
                    :img-src="sauce('storage/' + i.thumbnail)"
                    :img-alt="appName"
                    overlay
                    @click="open(sauce('storage/' + i.video), sauce('storage/' + i.thumbnail))"
                />
            </b-card-group>
            <b-pagination
                v-model="currentt"
                :total-rows="video.length"
                :per-page="perPage"
                aria-controls="ehe"
            />
            <hr class="bg-bpi-blue line" />
            <b-card-group columns id="ehe-te-nandayo">
                <b-card
                    v-for="(i, k) in nani"
                    class="img-view"
                    :key="k"
                    :img-src="sauce('storage/' + i.url)"
                    :img-alt="appName"
                    overlay
                    @click="open(sauce('storage/' + i.url))"
                />
            </b-card-group>
            <b-pagination
                v-model="current"
                :total-rows="data.length"
                :per-page="perPage"
                aria-controls="ehe-te-nandayo"
            />
        </b-container>
        <b-container v-else class="text-center p-5">
            <b-spinner variant="bpi-blue" style="width: 3rem;height: 3rem" />
        </b-container>

        <b-modal id="come-here-mortal" hide-header hide-footer size="xl">
            <div v-if="isVideo !== ''">
                <b-embed controls type="video" :poster="isVideo">
                    <source :src="view" />
                </b-embed>
            </div>
            <div v-else>
                <v-img :src="view" />
            </div>
            <b-row class="mt-3">
                <b-col class="share-text" cols="12">
                    <a
                        class="mx-1"
                        :href="`http://twitter.com/share?url=${view}`"
                        rel="noopener"
                        target="_blank"
                    >
                        <b-avatar variant="bpi-blue">
                            <fa :icon="['fab', 'twitter']" />
                        </b-avatar>
                    </a>
                    <a
                        class="mx-1"
                        :href="`https://www.facebook.com/sharer/sharer.php?u=${view}`"
                        target="_blank"
                        rel="noopener"
                    >
                        <b-avatar variant="bpi-blue">
                            <fa :icon="['fab', 'facebook-f']" />
                        </b-avatar>
                    </a>
                    <a
                        class="mx-1"
                        :href="`https://web.whatsapp.com/send?text=${view}`"
                        target="_blank"
                        rel="noopener"
                    >
                        <b-avatar variant="bpi-blue">
                            <fa :icon="['fab', 'whatsapp']" />
                        </b-avatar>
                    </a>
                    <a class="mx-1" :href="`mailto:?body=${view}`" rel="noopener" target="_blank">
                        <b-avatar variant="bpi-blue">
                            <fa icon="envelope" />
                        </b-avatar>
                    </a>
                </b-col>
            </b-row>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data: () => ({
        data: [],
        video: [],
        current: 1,
        currentt: 1,
        perPage: 9,
        ready: false,
        view: null,
        isVideo: '',
    }),
    mounted(){
        if(this.media?.gal){
            this.setData(this.media.gal)
        }else axios.get('gallery')
            .then(r => {
                this.setData(r.data)
                this.setMedia({ name: 'gal', data: r.data })
            })
    },
    methods: {
        open(sauce, video = ''){
            this.view = sauce
            this.isVideo = video
            this.$bvModal.show('come-here-mortal')
        },
        setData(data){
            this.data = data.img
            this.video = data.video
            this.ready = true
        },
        ...mapActions(['setMedia'])
    },
    computed: {
        nani(){
            return this.data.slice(
                (this.current - 1) * this.perPage,
                this.current * this.perPage
            )
        },
        nanii(){
            return this.video.slice(
                (this.currentt - 1) * this.perPage,
                this.currentt * this.perPage
            )
        },
        ...mapGetters(['media'])
    }
}
</script>
