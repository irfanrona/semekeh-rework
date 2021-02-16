<template>
    <div>
        <bread :title="$t('navbar.medias.agenda')" />

        <b-container v-if="ready" class="my-4">
            <b-row id="agenda-list">
                <b-col v-for="(i, k) in loop" :key="k" sm="12" md="6" lg="4" class="my-3">
                    <router-link :to="'/information-media/agenda/' + i.slug">
                        <b-card
                            class="agenda-card text-center"
                            overlay
                            :title="i.title"
                            :sub-title="i.time"
                            :img-src="sauce('storage/' + i.banner)"
                            :img-alt="appName"
                        >
                            <div class="agenda-footer">
                                <h2 class="text-center">
                                    <fa icon="chevron-up" />
                                    <br />
                                    {{ $t('readmore') }}
                                </h2>
                            </div>
                        </b-card>
                    </router-link>
                </b-col>
            </b-row>
            <b-pagination
                class="mt-3"
                v-model="current"
                :total-rows="data.length"
                :per-page="perPage"
                aria-controls="agenda-list"
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
        if(this.media?.agenda){
            this.setData(this.media.agenda)
        }else axios.get('agenda')
            .then(r => {
                this.setData(r.data)
                this.setMedia({ name: 'agenda', data: r.data })
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
        loop(){
            return this.data.slice(
                (this.current - 1) * this.perPage,
                this.current * this.perPage
            )
        },
        ...mapGetters(['media'])
    }
}
</script>
