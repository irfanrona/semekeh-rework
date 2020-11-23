<template>
    <div>
        <b-container class="my-4">
            <b-card>
                <create from="meta-tags" type="meta-tags">
                    <formulate-form name="meta-tags" @submit="send()">
                        <formulate-input
                            type="text"
                            v-model="form.type"
                            :label="$t('type')"
                            :help="$t('nullable')"
                            list="type-list"
                        />
                        <datalist id="type-list">
                            <option v-for="(i, k) in list" :key="k" :value="i.type" />
                        </datalist>
                        <formulate-input
                            type="text"
                            v-model="form.key"
                            :label="$t('name')"
                            validation="required"
                        />
                        <formulate-input
                            type="text"
                            v-model="form.value"
                            :label="$t('value')"
                            validation="required"
                        />
                        <formulate-input :label="$t('submit')" type="submit" :disabled="clicked">
                            <b-spinner v-if="clicked" variant="primary" small />
                        </formulate-input>
                    </formulate-form>
                </create>

                <data-table
                    :manual="true"
                    type="meta-tags"
                    :table="table"
                    :show="show"
                    :edit="edit"
                    :del="del"
                />
            </b-card>
        </b-container>

        <b-modal id="show" :title="$t('detail')" hide-footer>
            <div class="mb-2">
                <strong>{{ $t('type') }}</strong>
                <p>{{ modal.type ? modal.type : '-' }}</p>
            </div>
            <div class="mb-2">
                <strong>{{ $t('name') }}</strong>
                <p>{{ modal.key }}</p>
            </div>
            <div class="mb-2">
                <strong>{{ $t('value') }}</strong>
                <p>{{ modal.value }}</p>
            </div>
        </b-modal>
        <b-modal id="edit" :title="$t('edit')" size="lg" hide-footer>
            <form @submit.prevent="send('update/' + modal.id)">
                <b-form-group :label="$t('type')">
                    <b-form-input type="text" v-model="modal.type" list="type-list" />
                </b-form-group>
                <b-form-group :label="$t('name')">
                    <b-form-input type="text" v-model="modal.key" required />
                </b-form-group>
                <b-form-group :label="$t('value')">
                    <b-form-input type="text" v-model="modal.value" required />
                </b-form-group>

                <formulate-input :label="$t('update')" type="submit" :disabled="clicked">
                    <b-spinner v-if="clicked" variant="primary" small />
                </formulate-input>
            </form>
        </b-modal>
        <b-modal
            id="del"
            :title="$t('delete')"
            header-bg-variant="danger"
            header-text-variant="light"
            hide-footer
        >
            <p>{{ $t("confirm_delete") }}</p>
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
                { key: 'type', sortable: true },
                { key: 'key', sortable: true },
                { key: 'value', sortable: true },
                { key: 'action' }
            ],
            items: [],
            busy: true
        },
        list: [],
        form: {
            type: '',
            key: '',
            value: ''
        },
        modal: {},
        clicked: false
    }),
    mounted(){
        if(this.access['meta-tags.show'])
            this.render()
        else this.$router.push('/404')
    },
    methods: {
        render(){
            axios.get('admin/meta')
                .then(r => {
                    this.table.items = r.data.table
                    this.table.busy = false
                    this.list = r.data.list
                })
        },
        show(type, key){
            this.modal = key
            this.$bvModal.show('show')
        },
        edit(type, key){
            this.modal = key
            this.$bvModal.show('edit')
        },
        del(type, key){
            this.modal = key
            this.$bvModal.show('del')
        },
        send(url = 'create'){
            this.clicked = true

            axios.post('admin/meta/' + url, url === 'create' ? this.form : this.modal)
                .then(r => {
                    this.$formulate.reset('meta-tags')
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

            axios.delete('admin/meta/delete/' + id)
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
    }
}
</script>
