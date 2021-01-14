<template>
    <div v-if="section.length > 0">
        <swiper ref="carousel" :options="carouselConfig">
            <swiper-slide
                v-for="(i, k) in carousel"
                :key="k"
                :class="i.type === 3 ? 'd-block' : ''"
            >
                <div v-if="i.type === 1" class="col-md-12 content-slider-ilustrasi">
                    <div class="text-slider-ilustrasi">
                        <h1>{{ i.title }}</h1>
                        <p>{{ i.description }}</p>
                    </div>
                    <div class="img-slider-ilustrasi">
                        <img class="img-fluid" :src="sauce('storage/' + i.url)" :alt="i.title" />
                    </div>
                </div>
                <div v-else-if="i.type === 2" class="isi-content-slider">
                    <b-col md="5" lg="4" class="text-content-slider-3">
                        <div class="margin-text-slider">
                            <h4>{{ i.title }}</h4>
                            <div class="caption-slider-3">{{ i.description }}</div>
                        </div>
                    </b-col>
                </div>
                <img
                    :class="i.type === 1 ? 'back-img-ilustrasi' : ''"
                    :src="
                        sauce(i.type === 1 ? 'img/back-slider.webp' : 'storage/' + i.url)
                    "
                    :alt="i.title || appName"
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

        <div v-if="video.length" class="bpi-video">
            <div class="container">
                <b-row>
                    <b-col cols="12">
                        <div class="section-heading">
                            <h1>{{ section[0].title }}</h1>
                            <p>{{ section[0].subtitle }}</p>
                        </div>
                    </b-col>
                </b-row>

                <b-row>
                    <swiper class="swiper-bpi-video" :options="videoConfig">
                        <swiper-slide class="img-video" v-for="(i, k) in video" :key="k">
                            <img
                                class="img-fluid"
                                width="240"
                                height="150"
                                :src="sauce('storage/' + i.thumbnail)"
                                :alt="appName"
                                @click="openVideo(i.video, i.thumbnail)"
                            />
                        </swiper-slide>
                    </swiper>
                </b-row>
            </div>
        </div>

        <b-container v-if="about" fluid>
            <b-row>
                <b-col class="about-content" sm="12" md="12" lg="6">
                    <h4>{{ section[1].title }}</h4>
                    <h1>{{ section[1].subtitle }}</h1>
                    <markdown :content="about.content" />
                </b-col>
                <b-col sm="12" md="12" lg="1" />
                <b-col
                    class="about-img img-fluid"
                    sm="12"
                    md="12"
                    lg="5"
                    :style="`background-image: url(${sauce('storage/' + about.url)})`"
                />
            </b-row>
        </b-container>

        <b-container v-if="agenda" class="my-4">
            <b-row>
                <b-col cols="12">
                    <div class="section-heading">
                        <h1>{{ section[2].title }}</h1>
                        <p>{{ section[2].subtitle }}</p>
                    </div>
                </b-col>
            </b-row>
            <b-row class="justify-content-center">
                <b-col sm="12" md="6" lg="4">
                    <router-link :to="'/information-media/agenda/' + agenda.slug">
                        <b-card
                            class="agenda-card text-center"
                            overlay
                            :title="agenda.title"
                            :sub-title="agenda.time"
                            :img-src="sauce('storage/' + agenda.banner)"
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
        </b-container>

        <b-container class="my-4">
            <b-row>
                <b-col cols="12">
                    <div class="section-heading">
                        <h1>{{ section[3].title }}</h1>
                        <p>{{ section[3].subtitle }}</p>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col v-for="(i, k) in prestation" :key="k" sm="12" md="12" lg="4">
                    <div class="single-thumb-juara">
                        <div class="card-img-thumb">
                            <img
                                class="img-fluid"
                                width="450"
                                height="350"
                                :src="sauce('storage/' + i.url)"
                                :alt="i.title"
                            />
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
        </b-container>

        <b-container v-if="alumni.length" fluid class="bg-bpi-blue py-4">
            <b-container>
                <b-row>
                    <b-col cols="12">
                        <div class="section-heading">
                            <h1 class="text-light">{{ section[4].title }}</h1>
                            <p class="text-bpi-yellow">{{ section[4].subtitle }}</p>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col
                        v-for="(i, k) in alumni"
                        :key="k"
                        sm="12"
                        md="6"
                        lg="4"
                        class="respon-card"
                    >
                        <div class="single-thumb-artikel">
                            <div class="card-img-thumb">
                                <img
                                    class="img-fluid"
                                    width="420"
                                    height="350"
                                    :src="sauce('storage/' + i.url)"
                                    :alt="i.name"
                                />
                            </div>
                            <b-row>
                                <b-col sm="12" md="8" lg="8">
                                    <b-row>
                                        <div class="card-tgl">
                                            <b-row>
                                                <b-col cols="12" class="pt-2">
                                                    <p>{{ i.company }}</p>
                                                </b-col>
                                            </b-row>
                                        </div>
                                    </b-row>
                                </b-col>
                            </b-row>
                            <div class="card-body pt-0">
                                <h5 class="text-bpi-blue">{{ i.name }}</h5>
                                <div class="info-artikel border-top border-bpi-blue pt-2">
                                    <p>{{ i.content }}</p>
                                </div>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </b-container>

        <b-container v-if="company.length" class="my-4">
            <b-row>
                <b-col cols="12">
                    <div class="section-heading">
                        <h1>{{ section[5].title }}</h1>
                        <p>{{ section[5].subtitle }}</p>
                    </div>
                </b-col>
            </b-row>

            <div class="text-center">
                <b-btn variant="bpi-blue" @click="prevv()">
                    <fa icon="chevron-left" />
                    <span class="sr-only">{{ $t('rick_roll') }}</span>
                </b-btn>
                <b-btn variant="bpi-blue" @click="nextt()">
                    <fa icon="chevron-right" />
                    <span class="sr-only">{{ $t('rick_roll') }}</span>
                </b-btn>
            </div>

            <swiper ref="company" :options="companyConfig">
                <swiper-slide v-for="(i, k) in company" :key="k" class="company-slider">
                    <a class="company-img" :href="i.link" target="_blank" rel="noopener">
                        <img
                            class="img-fluid"
                            width="450"
                            height="75"
                            :src="sauce('storage/' + i.url)"
                            :alt="appName"
                        />
                    </a>
                </swiper-slide>
            </swiper>
        </b-container>

        <b-modal id="video-modal" :title="$t('admin.homepage.video')" hide-footer>
            <b-embed controls type="video" :poster="sauce('storage/' + modalVideo.thumbnail)">
                <source :src="sauce('storage/' + modalVideo.video)" />
            </b-embed>
        </b-modal>
    </div>
</template>

<script>
import Vue from 'vue'
import VueHead from 'vue-head'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import { mapGetters, mapActions } from 'vuex'

Vue.use(VueHead)
SwiperCore.use([Pagination, Autoplay])

export default {
    head: {
        link: [
            { rel: 'canonical', href: process.env.MIX_APP_URL }
        ],
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    data: () => ({
        carousel: [],
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
        video: [],
        videoConfig: {
            slidesPerView: 4,
            spaceBetween: 20,
            breakpoints: {
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                0: {
                    slidesPerView: 2,
                    spaceBetween: 0
                }
            }
        },
        modalVideo: {},
        about: null,
        alumni: [],
        company: [],
        companyConfig: {
            slidesPerView: 5,
            spaceBetween: 20,
            loop: true,
            navigation: {
                nextEl: '.comp-next',
                prevEl: '.comp-prev'
            },
            breakpoints: {
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 20
                },
                600: {
                    slidesPerView: 4,
                    spaceBetween: 20
                },
                0: {
                    slidesPerView: 1,
                    spaceBetween: 0
                }
            }
        },
        section: [],
        prestation: [],
        agenda: null
    }),
    mounted(){
        // Request chaining
        // this.req('section').then(() => {
        //     this.req('carousel').then(() => {
        //         if(this.carousel.length){
        //             this.swiper.slideTo(1)
        //             this.swiper.autoplay.stop()
        //             this.swiper.autoplay.start()
        //         }
    
        //         this.req('video').then(r => {
        //             this.videoConfig.breakpoints[1024].spaceBetween = this.video.length > 1 ? 20 : 0
    
        //             this.req('about').then(() => {
        //                 this.req('agenda').then(() => {
        //                     this.req('prestation').then(() => {
        //                         this.req('alumni').then(() => {
        //                             this.req('company')
        //                         })
        //                     })
        //                 })
        //             })
        //         })
        //     })
        // })

        // Request once
        if(this.welcome){
            this.setData(this.welcome)
            this.doSwiper()
        }else axios.get('welcome')
            .then(({ data }) => {
                this.setData(data)
                this.setWelcome(data)
            })
            .then(() => {
                this.doSwiper()
            })
    },
    methods: {
        // req(str){
        //     return axios.get('welcome/' + str).then(r => {
        //         this[str] = r.data
        //     })
        // },
        setData(data){
            this.carousel = data.carousel
            this.video = data.video
            this.about = data.about
            this.alumni = data.alumni
            this.company = data.company
            this.section = data.section
            this.prestation = data.prestation
            this.agenda = data.agenda
            this.videoConfig.breakpoints[1024].spaceBetween = this.video.length > 1 ? 20 : 0
        },
        doSwiper(){
            if(this.carousel.length){
                this.swiper?.slideTo(1)
                this.swiper?.autoplay?.stop()
                this.swiper?.autoplay?.start()
            }
        },
        next(){
            this.swiper?.slideNext()
        },
        prev(){
            this.swiper?.slidePrev()
        },
        nextt(){
            this.sComp?.slideNext()
        },
        prevv(){
            this.sComp?.slidePrev()
        },
        openVideo(vid, thumb){
            this.modalVideo = {
                video: vid,
                thumbnail: thumb
            }
            this.$bvModal.show('video-modal')
        },
        ...mapActions(['setWelcome'])
    },
    computed: {
        swiper(){
            return this.$refs.carousel?.$swiper
        },
        sComp(){
            return this.$refs.company?.$swiper
        },
        ...mapGetters(['welcome'])
    },
    directive: {
        swiper: directive
    }
}
</script>
