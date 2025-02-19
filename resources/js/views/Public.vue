<template>
    <div>
        <header class="breadcrumb-area bg-bpi-blue">
            <div class="container h-100">
                <b-row class="h-100 align-items-center">
                    <b-col cols="12">
                        <h2 class="page-title">{{ content ? content.title : bread[bread.length - 1].name }}</h2>
                        <p v-if="content && content.subtitle" class="text-white">{{ content.subtitle }}</p>
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
                    <markdown :content="content ? content.content : ''" />
                </b-col>
                <b-col sm="12" md="4" lg="4">
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
                </b-col>
            </b-row>
            <b-row v-if="council.json.length" class="my-4">
                <b-col cols="12">
                    <div class="my-4">
                        <h1 class="pb-3 mb-3 border-bottom markdown-header">{{ council.title }}</h1>
                        <chart :obj="council.json" :config="config" />
                    </div>
                </b-col>
            </b-row>
            <share v-if="content" :title="content.title" />
        </b-container>
        <b-container v-else class="text-center p-5">
            <b-spinner variant="bpi-blue" style="width: 3rem;height: 3rem" />
        </b-container>
    </div>
</template>

<script>
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import Chart from '../components/Chart'

SwiperCore.use([Pagination, Autoplay])

export default {
    components: {
        Swiper,
        SwiperSlide,
        Chart,
    },
    data: () => ({
        content: {},
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
        council: {
            title: '',
            json: []
        },
        config: {
            nodeBinding: {
                field_0: 'name',
                field_1: 'title',
                field_2: 'sub'
            },
        }
    }),
    mounted(){
        this.render()
    },
    methods: {
        render(){
            this.ready = false

            if(this.id > 0)
                axios.get('profile/' + this.id)
                    .then(r => {
                        this.content = r.data.content
                        this.img = r.data.img
                        if(this.id === 3 && r.data.council)
                            this.council = {
                                title: r.data.council.title,
                                json: JSON.parse(r.data.council.json)
                            }
                        else this.council = { title: '', json: [] }
                        this.ready = true
                    })
            else this.$router.push('/404')
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
        id(){
            const a = this.acc

            return a === 'public'
                ? 1
                : a === 'vision-mission'
                    ? 2
                    : a === 'student-council'
                        ? 3
                        : a === 'extracurricular'
                            ? 4
                            : 0
        },
        acc(){
            return this.$route.params.id
        },
        swiper(){
            return this.$refs.carousel.$swiper
        },
    },
    directive: {
        swiper: directive
    },
    watch: {
        '$route.params.id': function() {
            this.render()
        }
    },
}
</script>
