<template>
    <div>
        <bread :title="data.title || $t('navbar.medias.agenda')" />

        <b-container v-if="ready" class="my-4">
            <b-row>
                <b-col sm="12" md="8" lg="8">
                    <div class="detail-img">
                        <img :src="sauce('storage/' + data.banner)" :alt="appName" />
                    </div>
                    <div class="detail-post">
                        <div class="detail-label">
                            <p>{{ $t('navbar.media') }}</p>
                        </div>
                        <markdown :content="data.content" />
                        <swiper ref="carousel" :options="carouselConfig">
                            <swiper-slide v-for="(i, k) in img" :key="k">
                                <img
                                    class="img-fluid"
                                    :src="
                                        sauce('storage/' + i.url)
                                    "
                                    :alt="i.title || appName"
                                    style="height: auto"
                                />
                            </swiper-slide>

                            <div class="swiper-pagination" slot="pagination" />

                            <div
                                class="swiper-button-prev swiper-button carousel-btn-prev"
                                slot="button-prev"
                                @click="prev()"
                            >
                                <fa icon="chevron-left" />
                            </div>
                            <div
                                class="swiper-button-next swiper-button carousel-btn-next"
                                slot="button-next"
                                @click="next()"
                            >
                                <fa icon="chevron-right" />
                            </div>
                        </swiper>
                        <share :title="data.title" />
                    </div>
                </b-col>
                <b-col sm="12" md="4" lg="4">
                    <h3>{{ $t('other.agenda') }}</h3>
                    <b-row>
                        <b-col v-for="(i, k) in other" :key="k" cols="12" class="my-3">
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
                </b-col>
            </b-row>
        </b-container>
        <b-container v-else class="text-center p-5">
            <b-spinner variant="bpi-blue" style="width: 3rem;height: 3rem" />
        </b-container>
    </div>
</template>

<script>
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import { mapGetters, mapActions } from 'vuex'

SwiperCore.use([Pagination, Autoplay])

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    data: () => ({
        data: { title: '' },
        img: [],
        other: [],
        ready: false,
        carouselConfig: {
            loop: true,
            autoplay: {
                delay: 5500
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.carousel-btn-next',
                prevEl: '.carousel-btn-prev'
            }
        },
    }),
    mounted(){
        this.render()
    },
    methods: {
        render(){
            const slug = this.$route.params.slug,
                g = this.global[slug]

            this.ready = false

            if(g){
                if(typeof g.data === 'boolean')
                    this.$router.push('/404')
                else this.setData(g)
            }

            axios.get('agenda/' + slug)
                .then(r => {
                    if(r.data){
                        this.other = r.data.other

                        if(!g){
                            this.setData(r.data)
                            this.setGlobal({ name: slug, data: r.data })
                        }
                    }else{
                        this.setGlobal({ name: slug, data: false })
                        this.$router.push('/404')
                    }
                })
        },
        setData(data){
            this.data = data.agenda
            this.img = data.img
            this.ready = true
        },
        next(){
            this.swiper?.slideNext()
        },
        prev(){
            this.swiper?.slidePrev()
        },
        ...mapActions(['setGlobal'])
    },
    computed: {
        swiper(){
            return this.$refs.carousel?.$swiper
        },
        ...mapGetters(['global'])
    },
    directive: {
        swiper: directive
    },
    watch: {
        '$route.params.slug': function() {
            this.render()
        }
    },
}
</script>
