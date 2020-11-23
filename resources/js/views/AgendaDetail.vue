<template>
    <div>
        <header class="breadcrumb-area bg-bpi-blue">
            <div class="container h-100">
                <b-row class="h-100 align-items-center">
                    <b-col cols="12">
                        <h2 class="page-title">{{ data.title || $t('navbar.medias.agenda') }}</h2>
                        <p v-if="data.time" class="text-white">{{ data.time }}</p>
                        <b-breadcrumb>
                            <b-breadcrumb-item
                                v-for="(i, k) in bread"
                                :key="k"
                                :active="k + 1 === bread.length"
                            >
                                <span v-if="k + 1 === bread.length">
                                    <strong class="text-decoration-underline">{{ i.name }}</strong>
                                </span>
                                <span v-else>
                                    <router-link class="text-white" :to="i.to">{{ i.name }}</router-link>
                                </span>
                            </b-breadcrumb-item>
                        </b-breadcrumb>
                    </b-col>
                </b-row>
            </div>
        </header>
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
            this.ready = false

            axios.get('agenda/' + this.$route.params.slug)
                .then(r => {
                    if(r.data){
                        this.data = r.data.agenda
                        this.img = r.data.img
                        this.other = r.data.other
                        this.ready = true
                    }else this.$router.push('/404')
                })
        },
        next(){
            this.swiper.slideNext()
        },
        prev(){
            this.swiper.slidePrev()
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
                    name: e.replace(/-/g, ' '),
                    to: temp
                })
            })

            return obj
        },
        swiper(){
            return this.$refs.carousel.$swiper
        },
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
