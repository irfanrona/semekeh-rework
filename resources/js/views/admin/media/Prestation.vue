<template>
    <div v-if="ready" class="my-4">
        <b-container>
            <b-card>
                <create from="prestation" type="prestation">
                    <formulate-form name="prestation" @submit="send()">
                        <b-row class="mb-2">
                            <b-col cols="4">
                                <formulate-input
                                    type="text"
                                    :label="$t('title')"
                                    v-model="form.title"
                                    validation="required"
                                />
                            </b-col>
                            <b-col cols="4">
                                <formulate-input
                                    type="text"
                                    :label="$t('rank')"
                                    v-model="form.rank"
                                    validation="required"
                                />
                            </b-col>
                            <b-col cols="4">
                                <formulate-input
                                    type="number"
                                    :label="$t('year')"
                                    v-model="form.year"
                                    validation="required"
                                />
                            </b-col>
                        </b-row>
                        <formulate-input
                            type="image"
                            :label="$t('image')"
                            v-model="form.url"
                            validation="required|mime:image/jpg,image/jpeg,image/png,image/webp"
                            accept="image/jpg, image/jpeg, image/png, image/webp"
                        />
                        <formulate-input :label="$t('submit')" type="submit" :disabled="clicked">
                            <b-spinner v-if="clicked" variant="primary" small />
                        </formulate-input>
                    </formulate-form>
                </create>
                <data-table
                    :manual="true"
                    type="prestation"
                    :table="table"
                    :show="show"
                    :edit="edit"
                    :del="del"
                />
            </b-card>
        </b-container>

        <b-modal id="show" :title="$t('detail')" hide-footer>
            <h4 class="text-center">{{ modal.title }}</h4>
            <b-row class="mb-2 text-center">
                <b-col cols="6">
                    <strong>{{ $t('rank') }}</strong>
                    <p>{{ modal.rank }}</p>
                </b-col>
                <b-col cols="6">
                    <strong>{{ $t('year') }}</strong>
                    <p>{{ modal.year }}</p>
                </b-col>
            </b-row>
            <v-img :src="sauce('storage/' + modal.url)" />
        </b-modal>
        <b-modal id="edit" :title="$t('edit')" size="lg" hide-footer>
            <form @submit.prevent="send('update/' + modal.id)">
                <b-row class="mb-2">
                    <b-col cols="4">
                        <b-form-group :label="$t('title')">
                            <b-form-input v-model="modal.title" required />
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group :label="$t('rank')">
                            <b-form-input v-model="modal.rank" required />
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group :label="$t('year')">
                            <b-form-input type="number" v-model="modal.year" required />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-form-group :label="$t('rank')">
                    <b-form-file
                        v-model="modal.url"
                        accept="image/jpg, image/jpeg, image/png, image/webp"
                    />
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
                { key: 'title', sortable: true },
                { key: 'rank', sortable: true },
                { key: 'action' },
            ],
            items: [],
            busy: true
        },
        form: {
            title: '',
            rank: '',
            year: null,
            url: null
        },
        clicked: false,
        modal: {},
        ready: false
    }),
    mounted(){
        if(this.access['prestation.show'])
            this.refresh()
        else this.$router.push('/404')
    },
    methods: {
        show(type, key){
            this.modal = key
            this.$bvModal.show('show')
        },
        edit(type, key){
            this.modal = {}

            Object.assign(this.modal, key)
            this.modal.url = null

            this.$bvModal.show('edit')
        },
        del(type, key){
            this.modal = key
            this.$bvModal.show('del')
        },
        send(target = 'create'){
            const form = new FormData,
                f = target === 'create' ? this.form : this.modal

            this.clicked = true

            Object.keys(f).forEach(o => {
                let val

                try {
                    val = f[o].fileList[0]
                } catch (e) {
                    val = f[o]
                }
                form.append(o, val)
            })

            axios.post('admin/media/prestation/' + target, form)
                .then(r => {
                    this.clicked = false
                    this.refresh()

                    if(target !== 'create')
                        this.$bvModal.hide('edit')
                    else this.$formulate.reset('prestation')

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

            axios.delete('admin/media/prestation/delete/' + id)
                .then(r => {
                    this.clicked = false

                    this.refresh()
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
        },
        refresh(){
            axios.get('admin/media/prestation')
                .then(r => {
                    this.table.items = r.data
                    this.table.busy = false
                    this.ready = true
                })
        }
    },
    computed: {
        ...mapGetters(['access']),
    }
}
</script>
