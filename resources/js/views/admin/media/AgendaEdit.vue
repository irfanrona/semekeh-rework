<template>
    <div v-if="ready">
        <b-container class="my-4">
            <b-card>
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
                        accept="image/jpg, image/jpeg, image/png, image/webp"
                    />
                    <v-img class="mb-2" :src="sauce('storage/' + form.bannerP)" />
                    <formulate-input :label="$t('update')" type="submit" :disabled="clicked.agenda">
                        <b-spinner v-if="clicked.agenda" variant="primary" small />
                    </formulate-input>
                </formulate-form>
            </b-card>
            <b-card v-if="access['gallery.show']" class="my-4">
                <create from="gallery" type="gallery">
                    <formulate-form name="gallery" @submit="sendImg()">
                        <formulate-input
                            type="image"
                            v-model="img"
                            :label="$t('image')"
                            validation="required|mime:image/jpg,image/jpeg,image/png,image/webp"
                            accept="image/jpg, image/jpeg, image/png, image/webp"
                        />

                        <formulate-input
                            :label="$t('submit')"
                            type="submit"
                            :disabled="clicked.img"
                        >
                            <b-spinner v-if="clicked.img" variant="primary" small />
                        </formulate-input>
                    </formulate-form>
                </create>
                <data-table
                    :manual="true"
                    type="gallery"
                    :table="table"
                    :search="false"
                    :del="del"
                />
            </b-card>
        </b-container>

        <b-modal
            id="modal-del"
            :title="$t('delete')"
            header-bg-variant="danger"
            header-text-variant="light"
            hide-footer
        >
            <p>{{ $t("confirm_delete") }}</p>
            <b-btn class="btn btn-danger" :disabled="clicked.img" @click="delImg()">{{ $t("yes") }}</b-btn>
            <a
                href="#"
                class="btn btn-secondary"
                @click.prevent="$bvModal.hide('modal-del')"
            >{{ $t("no") }}</a>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        form: null,
        table: {
            fields: [
                { key: 'url' },
                { key: 'action' }
            ],
            items: [],
            busy: true
        },
        clicked: {
            agenda: false,
            img: false
        },
        ready: false,
        img: null,
        delId: 0,
    }),
    mounted(){
        if(this.access['agenda.update'])
            this.render()
        else this.$router.push('/404')
    },
    methods: {
        render(){
            axios.get('admin/media/agenda/edit/' + this.$route.params.slug)
                .then(r => {
                    if(r.data){
                        this.setData(r.data.agenda)
                        this.table.items = r.data.img
                        this.table.busy = false
                        this.ready = true
                    }else this.$router.push('/404')
                })
        },
        setData(obj){
            this.form = {
                title: obj.title,
                time: obj.time,
                content: obj.content,
                banner: null,
                bannerP: obj.banner,
                id: obj.id
            }
        },
        send(){
            const form = new FormData,
                f = this.form

            this.clicked.agenda = true

            Object.keys(f).forEach(o => {
                let val

                try {
                    val = f[o].fileList[0]
                } catch (e) {
                    val = f[o]
                }
                form.append(o, val)
            })

            axios.post('admin/media/agenda/update/' + f.id, form)
                .then(r => {
                    this.clicked.agenda = false
                    this.$formulate.reset('agenda')

                    this.$store.dispatch('alert/set', {
                        toast: this.$bvToast,
                        title: this.$t('success'),
                        text: r.data.message,
                        color: 'success'
                    })
                    this.$router.push('/admin/information-media/agenda')
                })
                .catch(e => {
                    this.catchErr(e)
                    this.clicked = false
                })
        },
        del(type, key){
            this.delId = key.id
            this.$bvModal.show('modal-del')
        },
        sendImg(){
            const f = new FormData
            this.clicked.img = true

            f.append('url', this.img.fileList[0])

            axios.post(`admin/media/agenda/img/create/${this.form.id}`, f)
                .then(r => {
                    this.$formulate.reset('gallery')
                    this.clicked.img = false
                    this.render()

                    this.$store.dispatch('alert/set', {
                        toast: this.$bvToast,
                        title: this.$t('success'),
                        text: r.data.message,
                        color: 'success'
                    })
                })
                .catch(e => {
                    this.catchErr(e)
                    this.clicked.img = false
                })
        },
        delImg(){
            this.clicked.img = true

            axios.delete('admin/media/agenda/img/delete/' + this.delId)
                .then(r => {
                    this.clicked.img = false
                    this.render()

                    this.$bvModal.hide('modal-del')

                    this.$store.dispatch('alert/set', {
                        toast: this.$bvToast,
                        title: this.$t('success'),
                        text: r.data.message,
                        color: 'success'
                    })
                })
                .catch(e => {
                    this.catchErr(e)
                    this.clicked.img = false
                })
        },
    },
    computed: {
        ...mapGetters(['access']),
    }
}
</script>
