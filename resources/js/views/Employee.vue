<template>
    <div>
        <header class="breadcrumb-area bg-bpi-blue">
            <div class="container h-100">
                <b-row class="h-100 align-items-center">
                    <b-col cols="12">
                        <h2 class="page-title">{{ $t('navbar.employees') }}</h2>
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
            <swiper ref="carousel" :options="carouselConfig" class="mb-4">
                <swiper-slide v-for="(i, k) in img" :key="k">
                    <img
                        class="img-fluid"
                        :src="sauce('storage/' + i.url)"
                        :alt="appName"
                        style="max-height: 450px;background-position: center;background-cover: cover;background-repeat: no-repeat;"
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
            <b-card>
                <div v-for="(i, k) in Object.keys(data)" :key="k" class="mb-4">
                    <h3 class="text-bpi-blue border-bottom border-bpi-blue pb-2">{{ $t(title[k]) }}</h3>
                    <b-row class="justify-content-center">
                        <b-col
                            v-for="(j, kk) in data[i]"
                            :key="k + '-' + kk"
                            sm="12"
                            md="6"
                            lg="4"
                            class="respon-card"
                        >
                            <div class="single-thumb-artikel">
                                <div class="card-img-thumb">
                                    <img :src="sauce('storage/' + j.url)" :alt="appName" />
                                </div>
                                <div class="card-body">
                                    <h5 class="text-bpi-blue">{{ j.name }}</h5>
                                    <div class="info-artikel border-top pt-2">
                                        <p>{{ j.title }}</p>
                                    </div>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </b-card>
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
        title: ['structural', 'head_study', 'productive', 'teacher', 'employee'],
        data: {
            first: [],
            firstt: [],
            firsttt: [],
            second: [],
            third: [],
        },
        img: [],
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
        axios.get('employee')
            .then(r => {
                const t = r.data.employee
                let a = this.data

                a.first = t.filter(i => i.type === 1 && i.child_type === 1)
                a.firstt = t.filter(i => i.type === 1 && i.child_type === 2)
                a.firsttt = this.sort(t.filter(i => i.type === 1 && i.child_type === 3))
                a.second = this.sort(t.filter(i => i.type === 2))
                a.third = this.sort(t.filter(i => i.type === 3))

                this.img = r.data.img
                this.ready = true
            })
    },
    methods: {
        next(){
            this.swiper.slideNext()
        },
        prev(){
            this.swiper.slidePrev()
        },
        sort(data){
            return data.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
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
                    to: a[c - 1] ? `/${a[c - 1].name}/${b}` : '/' + b
                })

                return obj
            }, [])

            return obj
        },
        swiper(){
            return this.$refs.carousel.$swiper
        },
    },
    directive: {
        swiper: directive
    },
}
</script>
