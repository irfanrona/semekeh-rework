<template>
    <b-container class="my-4">
        <b-card :title="$t('profile')">
            <formulate-form @submit="send()">
                <b-row>
                    <b-col cols="6">
                        <strong>{{ $t('email') }}</strong>
                        <p>{{ user.email }}</p>
                    </b-col>
                    <b-col cols="6">
                        <strong>{{ $t('role') }}</strong>
                        <p>{{ user.role }}</p>
                    </b-col>
                </b-row>
                <formulate-input
                    type="text"
                    :label="$t('name')"
                    :help="$t('required')"
                    v-model="user.name"
                    validation="required"
                />
                <b-row class="mb-2">
                    <b-col cols="6">
                        <b-form-group :label="$t('password_new')">
                            <b-input-group>
                                <b-input-group-prepend>
                                    <b-btn variant="bpi-blue" @click="toggle('view')">
                                        <fa :icon="view ? 'eye-slash' : 'eye'" />
                                    </b-btn>
                                </b-input-group-prepend>
                                <b-form-input
                                    :type="view ? 'text' : 'password'"
                                    v-model="p.password"
                                />
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group :label="$t('password_confirm')">
                            <b-input-group>
                                <b-input-group-prepend>
                                    <b-btn variant="bpi-blue" @click="toggle('vieww')">
                                        <fa :icon="vieww ? 'eye-slash' : 'eye'" />
                                    </b-btn>
                                </b-input-group-prepend>
                                <b-form-input
                                    :type="vieww ? 'text' : 'password'"
                                    v-model="p.password_confirm"
                                />
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
                <formulate-input
                    type="password"
                    :label="$t('password_old')"
                    :help="$t('required')"
                    v-model="pass"
                    validation="required"
                />
                <formulate-input :label="$t('update')" type="submit" :disabled="clicked">
                    <b-spinner v-if="clicked" variant="primary" small />
                </formulate-input>
            </formulate-form>
        </b-card>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        p: {
            password: '',
            password_confirm: ''
        },
        pass: '',
        clicked: false,
        view: false,
        vieww: false
    }),
    methods: {
        send(){
            this.clicked = true

            axios.post('admin/auth/update', {
                name: this.user.name,
                pass: this.pass,
                password: this.p.password !== '' ? this.p.password : null,
                password_confirmation: this.p.password_confirm,
            })
            .then(r => {
                this.clicked = false

                this.$store.dispatch('alert/set', {
                    toast: this.$bvToast,
                    title: this.$t('success'),
                    text: r.data.message,
                    color: 'success'
                })
                this.$store.dispatch('getUser')
            })
            .catch(e => {
                this.catchErr(e)
                this.clicked = false
            })
        },
        toggle(key){
            this[key] = !this[key]
        }
    },
    computed: {
        ...mapGetters(['user'])
    }
}
</script>
