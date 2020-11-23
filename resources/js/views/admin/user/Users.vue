<template>
    <div>
        <b-container class="my-4">
            <b-card>
                <create from="users" type="users">
                    <formulate-form name="users" @submit="send()">
                        <b-row class="mb-2">
                            <b-col cols="6">
                                <formulate-input
                                    type="text"
                                    v-model="form.name"
                                    :label="$t('name')"
                                    validation="required"
                                />
                            </b-col>
                            <b-col cols="6">
                                <formulate-input
                                    type="text"
                                    v-model="form.email"
                                    :label="$t('email')"
                                    validation="required|email"
                                />
                            </b-col>
                        </b-row>
                        <b-row class="mb-2">
                            <b-col cols="6">
                                <b-form-group :label="$t('password')">
                                    <b-input-group>
                                        <b-input-group-prepend>
                                            <b-btn variant="bpi-blue" @click="view = !view">
                                                <fa :icon="view ? 'eye-slash' : 'eye'" />
                                            </b-btn>
                                        </b-input-group-prepend>
                                        <b-form-input
                                            :type="view ? 'text' : 'password'"
                                            v-model="form.password"
                                            required
                                        />
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6">
                                <b-form-group :label="$t('password_confirm')">
                                    <b-input-group>
                                        <b-input-group-prepend>
                                            <b-btn variant="bpi-blue" @click="vieww = !vieww">
                                                <fa :icon="vieww ? 'eye-slash' : 'eye'" />
                                            </b-btn>
                                        </b-input-group-prepend>
                                        <b-form-input
                                            :type="vieww ? 'text' : 'password'"
                                            v-model="form.password_confirmation"
                                            required
                                        />
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <formulate-input
                            type="select"
                            v-model="form.role_id"
                            :label="$t('role')"
                            :options="list"
                            validation="required"
                        />
                        <formulate-input :label="$t('submit')" type="submit" :disabled="clicked">
                            <b-spinner v-if="clicked" variant="primary" small />
                        </formulate-input>
                    </formulate-form>
                </create>

                <data-table :manual="true" type="users" :table="table" :edit="edit">
                    <template #default="data">
                        <b-btn
                            v-if="access['users.delete']"
                            :variant="data.cell.is_active ? 'success' : 'danger'"
                            size="sm"
                            @click="del('', data.cell)"
                            v-b-tooltip.hover
                            :title="$t(data.cell.is_active ? 'is_active' : 'is_inactive')"
                        >
                            <fa :icon="data.cell.is_active ? 'check' : 'times'" />
                        </b-btn>
                    </template>
                </data-table>
            </b-card>
        </b-container>

        <b-modal id="edit" :title="$t('edit')" size="lg" hide-footer>
            <form @submit.prevent="send('update/' + modal.id)">
                <b-row>
                    <b-col cols="6">
                        <b-form-group :label="$t('name')">
                            <b-form-input type="text" v-model="modal.name" required />
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group :label="$t('email')">
                            <b-form-input type="text" v-model="modal.email" required />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row class="mb-2">
                    <b-col cols="6">
                        <b-form-group :label="$t('password')">
                            <b-input-group>
                                <b-input-group-prepend>
                                    <b-btn variant="bpi-blue" @click="view = !view">
                                        <fa :icon="view ? 'eye-slash' : 'eye'" />
                                    </b-btn>
                                </b-input-group-prepend>
                                <b-form-input
                                    :type="view ? 'text' : 'password'"
                                    v-model="modal.password"
                                />
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group :label="$t('password_confirm')">
                            <b-input-group>
                                <b-input-group-prepend>
                                    <b-btn variant="bpi-blue" @click="vieww = !vieww">
                                        <fa :icon="vieww ? 'eye-slash' : 'eye'" />
                                    </b-btn>
                                </b-input-group-prepend>
                                <b-form-input
                                    :type="vieww ? 'text' : 'password'"
                                    v-model="modal.password_confirmation"
                                />
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-form-group>
                    <b-form-select v-model="modal.role_id" :options="role" required />
                </b-form-group>

                <formulate-input :label="$t('update')" type="submit" :disabled="clicked">
                    <b-spinner v-if="clicked" variant="primary" small />
                </formulate-input>
            </form>
        </b-modal>
        <b-modal
            id="del"
            :title="$t('confirmation')"
            header-bg-variant="danger"
            header-text-variant="light"
            hide-footer
        >
            <p>{{ $t("confirm_toggle", {toggle: $t(!!modal.is_active ? 'inactive' : 'active')}) }}</p>
            <b-btn
                class="btn btn-danger"
                :disabled="clicked"
                @click="destroy(modal.id)"
            >{{ $t("yes") }}</b-btn>
            <a
                href="#"
                class="btn btn-secondary"
                @click.prevent="$bvModal.hide('del')"
            >{{ $t("no") }}</a>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        table: {
            fields: [
                { key: 'name', sortable: true },
                { key: 'email', sortable: true },
                { key: 'role', sortable: true },
                { key: 'action' }
            ],
            items: [],
            busy: true
        },
        list: [],
        form: {
            type: '',
            key: '',
            value: '',
            password: '',
            password_confirmation: '',
            role_id: null
        },
        modal: {},
        clicked: false,
        view: false,
        vieww: false
    }),
    mounted(){
        if(this.access['users.show'])
            this.render()
        else this.$router.push('/404')
    },
    methods: {
        render(){
            axios.get('admin/user')
                .then(r => {
                    this.table.items = r.data.user
                    this.table.busy = false
                    this.list = r.data.role
                })
        },
        edit(type, key){
            this.modal = key
            this.modal.password = null
            this.modal.password_confirmation = null

            this.$bvModal.show('edit')
        },
        del(type, key){
            this.modal = key
            this.$bvModal.show('del')
        },
        send(url = 'create'){
            this.clicked = true

            axios.post('admin/user/' + url, url === 'create' ? this.form : this.modal)
                .then(r => {
                    this.$formulate.reset('users')
                    this.clicked = false
                    this.render()

                    if(url !== 'create')
                        this.$bvModal.hide('edit')

                    this.$store.dispatch('alert/set', {
                        toast: this.$bvToast,
                        title: this.$t('success'),
                        text: r.data.message,
                        color: 'success'
                    })
                })
                .catch(e => {
                    this.catchErr(e)
                    this.clicked = false
                })
        },
        destroy(id){
            this.clicked = true

            axios.post('admin/user/ban/' + id)
                .then(r => {
                    this.clicked = false

                    this.render()
                    this.$bvModal.hide('del')

                    this.$store.dispatch('alert/set', {
                        toast: this.$bvToast,
                        title: this.$t('success'),
                        text: r.data.message,
                        color: 'success'
                    })
                })
                .catch(e => {
                    this.catchErr(e)
                    this.clicked = false
                })
        }
    },
    computed: {
        ...mapGetters(['access']),
        role(){
            let arr = []

            Object.keys(this.list).forEach(i => arr.push({
                value: i,
                text: this.list[i]
            }))

            return arr
        }
    }
}
</script>
