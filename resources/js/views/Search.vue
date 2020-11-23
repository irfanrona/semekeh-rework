<template>
    <div>
        <header class="breadcrumb-area bg-bpi-blue">
            <div class="container h-100">
                <b-row class="h-100 align-items-center">
                    <b-col cols="12">
                        <h2 class="page-title">{{ bread[bread.length - 1].name }}</h2>
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
            <div v-if="agenda.length">
                <h3 class="text-bpi-blue">{{ $t('navbar.medias.agenda') }}</h3>
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
                    :total-rows="agenda.length"
                    :per-page="perPage"
                    aria-controls="agenda-list"
                />
            </div>
            <div v-else>
                <h1
                    class="text-center text-bpi-blue"
                >{{ $t('search_not_found', {type: $t('navbar.medias.agenda'), q: $route.query.q}) }}</h1>
            </div>
            <hr class="bg-bpi-blue line" />
            <div v-if="pres.length">
                <h3 class="text-bpi-blue">{{ $t('navbar.medias.prestations') }}</h3>
                <b-row id="ehe-te-nandayo">
                    <b-col v-for="(i, k) in nani" :key="k" sm="12" md="12" lg="4">
                        <div class="single-thumb-juara">
                            <div class="card-img-thumb">
                                <img :src="sauce('storage/' + i.url)" :alt="i.title" />
                            </div>
                            <div class="card-body text-center">
                                <h4 class="text-bpi-blue">{{ i.title }}</h4>
                            </div>
                            <div class="card-footer text-center bg-bpi-blue">
                                <b-row class="justify-content-md-center">
                                    <b-col cols="5" class="p-0">
                                        <p class="m-0 text-white">{{ $t('rank') }}</p>
                                        <p class="m-0 text-bpi-yellow">{{ i.rank }}</p>
                                    </b-col>
                                    <b-col cols="2" class="p-0 align-items-center">
                                        <p class="m-0 text-white pt-2">|</p>
                                    </b-col>
                                    <b-col cols="5" class="p-0">
                                        <p class="m-0 text-white">{{ $t('year') }}</p>
                                        <p class="m-0 text-bpi-yellow">{{ i.year }}</p>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                    </b-col>
                </b-row>
                <b-pagination
                    v-model="currentt"
                    :total-rows="pres.length"
                    :per-page="perPagee"
                    aria-controls="ehe-te-nandayo"
                />
            </div>
            <div v-else>
                <h1
                    class="text-center text-bpi-blue"
                >{{ $t('search_not_found', {type: $t('navbar.medias.prestations'), q: $route.query.q}) }}</h1>
            </div>
        </b-container>
        <b-container v-else class="text-center p-5">
            <b-spinner variant="bpi-blue" style="width: 3rem;height: 3rem" />
        </b-container>
    </div>
</template>

<script>
export default {
    data: () => ({
        agenda: [],
        pres: [],
        current: 1,
        perPage: 9,
        currentt: 1,
        perPagee: 9,
        ready: false
    }),
    mounted(){
        this.render()
    },
    methods: {
        render(q = this.$route.query.q){
            axios.get('search?q=' + q)
                .then(r => {
                    this.agenda = r.data.agenda
                    this.pres = r.data.pres
                    this.ready = true
                })
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
        loop(){
            return this.agenda.slice(
                (this.current - 1) * this.perPage,
                this.current * this.perPage
            )
        },
        nani(){
            return this.pres.slice(
                (this.currentt - 1) * this.perPagee,
                this.currentt * this.perPagee
            )
        }
    },
    watch: {
        '$route.query.q': {
            handler(q){
                this.render(q)
            }
        },
        deep: true
    }
}
</script>
