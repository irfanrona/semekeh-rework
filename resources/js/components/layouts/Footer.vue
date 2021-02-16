<template>
    <div class="footer">
        <b-container>
            <b-row class="back-footer justfiy-content-center">
                <b-col xs="12" sm="6" md="6" lg="4" class="p-4">
                    <h3>{{ $t("footer.about") }}</h3>
                    <hr class="line" />
                    <dl v-for="(i, k) in footer" :key="k" class="text-light">
                        <dt>{{ i.key }}</dt>
                        <dd>{{ i.value }}</dd>
                    </dl>
                </b-col>
                <b-col xs="12" sm="6" md="6" lg="4" class="p-4">
                    <h3>{{ $t("navbar.medias.social") }}</h3>
                    <hr class="line" />
                    <ul class="list-unstyled">
                        <li class="btn-tentang">
                            <a
                                class="py-2 pr-2"
                                v-for="(i, k) in social"
                                :key="k"
                                :href="i.link"
                                target="_blank"
                                rel="noopener"
                            >
                                <b-avatar size="2rem" variant="bpi-yellow">
                                    <fa class="text-bpi-blue" :icon="['fab', i.icon]" />
                                    <span class="sr-only">{{ $t('rick_roll') }}</span>
                                </b-avatar>
                            </a>
                        </li>
                    </ul>
                </b-col>
                <b-col xs="12" sm="12" md="12" lg="4" class="p-4">
                    <h3>{{ $t("navbar.medias.agenda") }}</h3>
                    <hr class="line" />
                    <router-link
                        class="text-decoration-none"
                        v-if="agenda"
                        :to="'/information-media/agenda/' + agenda.slug"
                    >
                        <b-row no-gutters>
                            <b-col sm="12" md="4" lg="4">
                                <v-img :src="sauce('storage/' + agenda.banner)" class="mb-2" />
                            </b-col>
                            <b-col sm="12" md="7" lg="7">
                                <div class="px-2">
                                    <p class="text-bpi-yellow mb-1">{{ agenda.time }}</p>
                                    <p class="text-white">{{ agenda.title }}</p>
                                </div>
                            </b-col>
                        </b-row>
                    </router-link>
                </b-col>
            </b-row>
        </b-container>
        <div class="copyright">
            <p>
                {{ $t("footer.copyright") }} &copy;
                {{ ` ${new Date().getFullYear()} - ` }}
                <router-link to="/about">
                    <strong>{{ appName }}</strong>
                </router-link>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['social', 'footer', 'agenda'],
    // data: () => ({
    //     agenda: null
    // }),
    // mounted(){
    //     axios.get('footer')
    //         .then(r => this.agenda = r.data)
    // }
}
</script>
