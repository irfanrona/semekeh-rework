<template>
    <div>
        <b-container class="my-4">
            <b-card>
                <create from="employees" type="employees">
                    <formulate-form name="employees" @submit="send()">
                        <b-row class="mb-2">
                            <b-col sm="12" md="6" lg="6">
                                <formulate-input
                                    type="text"
                                    v-model="form.name"
                                    :label="$t('name')"
                                    validation="required"
                                />
                            </b-col>
                            <b-col sm="12" md="6" lg="6">
                                <formulate-input
                                    type="text"
                                    v-model="form.title"
                                    :label="$t('title')"
                                    validation="required"
                                />
                            </b-col>
                        </b-row>
                        <formulate-input
                            v-model="form.type"
                            :options="{1: 'Guru Produktif', 2: 'Guru Mata Pelajaran', 3: 'Karyawan'}"
                            type="select"
                            :label="$t('type')"
                            validation="required"
                        />
                        <formulate-input
                            type="image"
                            v-model="form.url"
                            :label="$t('image')"
                            validation="required|mime:image/jpg,image/jpeg,image/png,image/webp"
                            accept="image/jpg, image/jpeg, image/png, image/webp"
                        />
                        <formulate-input :label="$t('submit')" type="submit" :disabled="clicked">
                            <b-spinner v-if="clicked" variant="primary" small />
                        </formulate-input>
                    </formulate-form>
                </create>

                <div v-for="(i, k) in Object.keys(table)" :key="k" class="mb-4">
                    <h3>{{ $t(title[k]) }}</h3>
                    <data-table
                        :manual="true"
                        type="employees"
                        :table="table[i]"
                        :show="show"
                        :edit="edit"
                        :delEmp="del"
                    />
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

                        <formulate-input :label="$t('submit')" type="submit" :disabled="clickedd">
                            <b-spinner v-if="clickedd" variant="primary" small />
                        </formulate-input>
                    </formulate-form>
                </create>
                <data-table
                    :manual="true"
                    type="gallery"
                    :table="tableImg"
                    :search="false"
                    :del="del"
                />
            </b-card>
        </b-container>

        <b-modal id="show" :title="$t('detail')" hide-footer>
            <h4 class="text-center">{{ modal.title }}</h4>
            <b-row class="mb-2 text-center">
                <b-col cols="6">
                    <strong>{{ $t('name') }}</strong>
                    <p>{{ modal.name }}</p>
                </b-col>
                <b-col cols="6">
                    <strong>{{ $t('title') }}</strong>
                    <p>{{ modal.title }}</p>
                </b-col>
            </b-row>
            <v-img :src="sauce('storage/' + modal.url)" />
        </b-modal>
        <b-modal id="edit" :title="$t('edit')" size="lg" hide-footer>
            <form @submit.prevent="send('update/' + modal.id)">
                <b-row class="mb-2">
                    <b-col cols="6">
                        <b-form-group :label="$t('name')">
                            <b-form-input v-model="modal.name" required />
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group :label="$t('title')">
                            <b-form-input v-model="modal.title" required />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-form-group v-if="modal.type !== 1" :label="$t('type')">
                    <b-form-select
                        v-model="modal.type"
                        :options="[{value: 2, text: 'Guru Mata Pelajaran'},{value: 3, text: 'Karyawan'},]"
                    />
                </b-form-group>
                <b-form-group :label="$t('image')">
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
        <b-modal
            id="modal-del"
            :title="$t('delete')"
            header-bg-variant="danger"
            header-text-variant="light"
            hide-footer
        >
            <p>{{ $t("confirm_delete") }}</p>
            <b-btn class="btn btn-danger" :disabled="clickedd" @click="delImg()">{{ $t("yes") }}</b-btn>
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
        title: ['structural', 'head_study', 'productive', 'teacher', 'employee'],
        table: {
            first: {
                fields: [
                    { key: 'name', sortable: true },
                    { key: 'title', sortable: true },
                    { key: 'action' },
                ],
                items: [],
                busy: true
            },
            firstt: {
                fields: [
                    { key: 'name', sortable: true },
                    { key: 'title', sortable: true },
                    { key: 'action' },
                ],
                items: [],
                busy: true
            },
            firsttt: {
                fields: [
                    { key: 'name', sortable: true },
                    { key: 'title', sortable: true },
                    { key: 'action' },
                ],
                items: [],
                busy: true
            },
            second: {
                fields: [
                    { key: 'name', sortable: true },
                    { key: 'title', sortable: true },
                    { key: 'action' },
                ],
                items: [],
                busy: true
            },
            third: {
                fields: [
                    { key: 'name', sortable: true },
                    { key: 'title', sortable: true },
                    { key: 'action' },
                ],
                items: [],
                busy: true
            },
        },
        tableImg: {
            fields: [
                { key: 'url' },
                { key: 'action' }
            ],
            items: [],
            busy: true
        },
        form: {
            name: '',
            title: '',
            type: null,
            url: null
        },
        img: null,
        delId: null,
        clicked: false,
        clickedd: false,
        modal: {}
    }),
    mounted(){
        if(this.access['employees.show'])
            this.render()
        else this.$router.push('/404')
    },
    methods: {
        render(){
            axios.get('admin/employee')
                .then(r => {
                    const t = r.data.employee
                    let a = this.table

                    a.first.items = t.filter(i => i.type === 1 && i.child_type === 1)
                    a.first.busy = false
                    a.firstt.items = t.filter(i => i.type === 1 && i.child_type === 2)
                    a.firstt.busy = false
                    a.firsttt.items = t.filter(i => i.type === 1 && i.child_type === 3)
                    a.firsttt.busy = false

                    a.second.items = t.filter(i => i.type === 2)
                    a.second.busy = false

                    a.third.items = t.filter(i => i.type === 3)
                    a.third.busy = false

                    this.tableImg.items = r.data.img
                    this.tableImg.busy = false
                })
        },
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
            this.delId = key.id

            this.$bvModal.show(type === 'gallery' ? 'modal-del' : 'del')
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

            axios.post('admin/employee/' + target, form)
                .then(r => {
                    this.clicked = false
                    this.render()

                    if(target !== 'create')
                        this.$bvModal.hide('edit')
                    else this.$formulate.reset('employees')

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

            axios.delete('admin/employee/delete/' + id)
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
        },
        sendImg(){
            const f = new FormData
            this.clickedd = true

            f.append('url', this.img.fileList[0])

            axios.post(`admin/employee/img/create`, f)
                .then(r => {
                    this.$formulate.reset('gallery')
                    this.clickedd = false
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
                    this.clickedd = false
                })
        },
        delImg(){
            this.clickedd = true

            axios.delete('admin/employee/img/delete/' + this.delId)
                .then(r => {
                    this.clickedd = false
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
                    this.clickedd = false
                })
        },
    },
    computed: {
        ...mapGetters(['access']),
    },
}
</script>
