<template>
    <div v-if="ready" class="my-4">
        <b-container>
            <b-card v-if="access[acc + '.update']" :title="content.title" class="my-4">
                <formulate-form name="content" @submit="send()">
                    <b-row class="mb-2">
                        <b-col cols="6">
                            <formulate-input
                                type="text"
                                :label="$t('title')"
                                v-model="content.title"
                                validation="required"
                            />
                        </b-col>
                        <b-col cols="6">
                            <formulate-input
                                type="text"
                                :label="$t('subtitle')"
                                v-model="content.subtitle"
                            />
                        </b-col>
                    </b-row>
                    <formulate-input
                        type="markdown"
                        :label="$t('content')"
                        v-model="content.content"
                        validation="required"
                    />

                    <formulate-input
                        type="submit"
                        :label="$t('update')"
                        :disabled="clicked.content"
                    >
                        <b-spinner v-if="clicked.content" variant="primary" small />
                    </formulate-input>
                </formulate-form>
            </b-card>

            <b-card v-if="id === 3 && access['student-council.update'] && council.json.length">
                <formulate-input type="text" :label="$t('title')" v-model="council.title" />
                <chart :obj="council.json" :config="config" :edit="true" />
                <div class="mt-4">
                    <b-btn
                        :disabled="clicked.council"
                        variant="bpi-blue"
                        @click="save()"
                    >{{ $t('update') }}</b-btn>
                </div>
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
import Chart from '../../components/Chart'

export default {
    components: {
        Chart
    },
    data: () => ({
        content: {},
        table: {
            fields: [
                { key: 'url', label: 'Image' },
                { key: 'action' }
            ],
            items: [],
            busy: true
        },
        clicked: {
            content: false,
            img: false,
            council: false
        },
        img: null,
        delId: 0,
        council: { title: '', json: [] },
        config: {
            nodeBinding: {
                field_0: 'name',
                field_1: 'title',
                field_2: 'sub'
            },
            nodeMenu: {
                edit: { text: 'Edit' },
                // add: { text: 'Add' },
                // remove: { text: 'Remove' }
            },
            enableDragDrop: true
        },
        ready: false
    }),
    mounted(){
        this.render()
    },
    methods: {
        del(type, key){
            this.delId = key.id
            this.$bvModal.show('modal-del')
        },
        send(){
            this.clicked.content = true

            axios.post('admin/profile/update/' + this.id, this.content)
                .then(r => {
                    this.clicked.content = false

                    this.$store.dispatch('alert/set', {
                        toast: this.$bvToast,
                        title: this.$t('success'),
                        text: r.data.message,
                        color: 'success'
                    })
                })
                .catch(e => {
                    this.catchErr(e)
                    this.clicked.content = false
                })
        },
        render(){
            if(this.id > 0 && this.access[this.acc + '.show']){
                axios.get('admin/profile/' + this.id)
                    .then(r => {
                        this.content = r.data.table
                        this.table.items = r.data.img
                        this.table.busy = false
                        this.ready = true
                    })
                    .then(() => {
                        if(this.id === 3)
                            axios.get('admin/profile/council/get')
                                .then(r => this.council = {
                                    title: r.data.title,
                                    json: JSON.parse(r.data.json)
                                })
                    })
            }else this.$router.push('/404')
        },
        sendImg(){
            const f = new FormData
            this.clicked.img = true

            f.append('url', this.img.fileList[0])

            axios.post(`admin/profile/img/create/${this.id}`, f)
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

            axios.delete('admin/profile/img/delete/' + this.delId)
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
        save(){
            if(this.council.title !== '' && this.council.json.length){
                this.clicked.council = true

                axios.post('admin/profile/council/update', {
                    title: this.council.title,
                    json: JSON.stringify(this.council.json)
                })
                .then(r => {
                    this.clicked.council = false

                    this.$store.dispatch('alert/set', {
                        toast: this.$bvToast,
                        title: this.$t('success'),
                        text: r.data.message,
                        color: 'success'
                    })
                })
                .catch(e => {
                    this.catchErr(e)
                    this.clicked.council = false
                })
            }
        }
    },
    computed: {
        ...mapGetters(['access']),
        id(){
            const a = this.acc

            return a === 'public-profile'
                ? 1
                : a === 'vision-mission'
                    ? 2
                    : a === 'student-council'
                        ? 3
                        : a === 'extracurricular'
                            ? 4
                            : 0
        },
        acc(){
            return this.$route.params.id
        }
    },
    watch: {
        '$route.params.id': function() {
            this.ready = false
            this.render()
        }
    }
}
</script>
