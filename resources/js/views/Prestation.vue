<template>
    <div>
        <bread :title="$t('navbar.medias.prestations')" />

        <b-container v-if="ready" class="my-4">
            <b-row id="ehe-te-nandayo">
                <b-col v-for="(i, k) in nani" :key="k" sm="12" md="6" lg="4">
                    <div class="single-thumb-juara">
                        <div class="card-img-thumb">
                            <img :src="sauce('storage/' + i.url)" :alt="i.title" />
                        </div>
                        <div class="card-body text-center">
                            <h4 class="text-bpi-blue">{{ i.title }}</h4>
                        </div>
                        <div class="card-footer text-center bg-bpi-blue">
                            <b-row class="justify-content-md-center">
                                <b-col cols="6" class="p-0 border-right border-white">
                                    <p class="m-0 text-white">{{ $t('rank') }}</p>
                                    <p class="m-0 text-bpi-yellow">{{ i.rank }}</p>
                                </b-col>
                                <b-col cols="6" class="p-0">
                                    <p class="m-0 text-white">{{ $t('year') }}</p>
                                    <p class="m-0 text-bpi-yellow">{{ i.year }}</p>
                                </b-col>
                            </b-row>
                        </div>
                    </div>
                </b-col>
            </b-row>
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
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data: () => ({
        data: [],
        current: 1,
        perPage: 9,
        ready: false
    }),
    mounted(){
        if(this.media?.pres){
            this.setData(this.media.pres)
        }else axios.get('prestation')
            .then(r => {
                this.setData(r.data)
                this.setMedia({ name: 'pres', data: r.data })
            })
    },
    methods: {
        setData(data){
            this.data = data
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
        ...mapGetters(['media'])
    }
}
</script>
