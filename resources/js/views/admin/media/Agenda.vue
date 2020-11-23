<template>
    <div v-if="ready" class="my-4">
        <b-container>
            <b-card>
                <create from="agenda" type="agenda">
                    <formulate-form name="agenda" @submit="send()">
                        <b-row class="mb-2">
                            <b-col cols="6">
                                <formulate-input
                                    type="text"
                                    :label="$t('title')"
                                    v-model="form.title"
                                    validation="required"
                                />
                            </b-col>
                            <b-col cols="6">
                                <formulate-input
                                    type="text"
                                    :label="$t('held')"
                                    v-model="form.time"
                                    validation="required"
                                />
                            </b-col>
                        </b-row>
                        <formulate-input
                            type="markdown"
                            :label="$t('content')"
                            v-model="form.content"
                            validation="required"
                        />
                        <formulate-input
                            type="image"
                            :label="$t('banner')"
                            v-model="form.banner"
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
                    type="agenda"
                    :table="table"
                    :show="show"
                    :edit="edit"
                    :del="del"
                />
            </b-card>
        </b-container>

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
                { key: 'action' },
            ],
            items: [],
            busy: true
        },
        form: {
            title: '',
            time: '',
            content: '',
            banner: null
        },
        clicked: false,
        modal: {},
        ready: false
    }),
    mounted(){
        if(this.access['agenda.show'])
            this.refresh()
        else this.$router.push('/404')
    },
    methods: {
        show(type, key){
            window.open(this.$router.resolve({
                name: 'media-agenda-detail',
                params: { slug: key.slug }
            }).href, '_blank')
        },
        edit(type, key){
            this.$router.push('/admin/information-media/agenda/' + key.slug)
        },
        del(type, key){
            this.modal = key
            this.$bvModal.show('del')
        },
        send(){
            const form = new FormData,
                f = this.form

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

            axios.post('admin/media/agenda/create', form)
                .then(r => {
                    this.clicked = false
                    this.refresh()
                    this.$formulate.reset('agenda')

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

            axios.delete('admin/media/agenda/delete/' + id)
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
            axios.get('admin/media/agenda')
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
