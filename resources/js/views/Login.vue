<template>
    <b-container class="my-4 py-4">
        <b-row class="justify-content-center">
            <b-col xs="12" sm="12" md="9" lg="5">
                <b-card :title="$t('login')">
                    <b-card-body>
                        <formulate-form @submit="send()">
                            <formulate-input
                                :label="$t('email')"
                                type="email"
                                v-model="form.email"
                                validation="required|email"
                            />
                            <formulate-input
                                :label="$t('password')"
                                type="password"
                                v-model="form.password"
                                validation="required"
                            />
                            <recaptcha
                                ref="reeee"
                                class="mb-2"
                                @verify="onVerify"
                                :sitekey="key"
                                :loadRecaptchaScript="true"
                            />
                            <formulate-input :label="$t('login')" type="submit" :disabled="clicked">
                                <b-spinner v-if="clicked" variant="primary" small />
                            </formulate-input>
                        </formulate-form>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    data: () => ({
        form: {
            email: '',
            password: '',
            recaptcha: ''
        },
        clicked: false,
        key: process.env.MIX_SITE_KEY
    }),
    methods: {
        send(){
            this.clicked = true
            this.$store.dispatch('login', this.form)
                .then(() => {
                    this.clicked = false
                    this.$refs.reeee.reset()
                    this.$router.push({ name: 'admin-homepage' })
                })
                .catch(e => {
                    if(e.response.status === 422){
                        const h = this.$createElement
                        let txt = []

                        Object.values(e.response.data).forEach(o => txt.push(h('p', o)))

                        this.$store.dispatch('alert/set', {
                            toast: this.$bvToast,
                            title: this.$t('errors.error'),
                            text: h('div', txt),
                            color: 'danger'
                        })
                    }else this.$store.dispatch('alert/set', {
                        toast: this.$bvToast,
                        title: this.$t('errors.server'),
                        text: this.$t('errors.server_detail'),
                        color: 'danger'
                    })
                    this.$refs.reeee.reset()
                    this.clicked = false
                })
        },
        onVerify(resp){
            this.form.recaptcha = resp
        }
    }
}
</script>
