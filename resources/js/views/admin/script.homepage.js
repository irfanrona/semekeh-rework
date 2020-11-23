import { mapGetters } from 'vuex'

export default {
    data: () => ({
        table: {
            carousel: {
                fields: [
                    { key: 'title', sortable: true },
                    { key: 'action' },
                ],
                items: [],
                busy: true
            },
            video: {
                fields: [
                    { key: 'thumbnail' },
                    { key: 'action' }
                ],
                items: [],
                busy: true
            },
            about: {
                content: '',
            },
            alumni: {
                fields: [
                    { key: 'name', sortable: true },
                    { key: 'company', sortable: true },
                    { key: 'action' }
                ],
                items: [],
                busy: true
            },
            company: {
                fields: [
                    { key: 'link', sortable: true },
                    { key: 'action' }
                ],
                items: [],
                busy: true
            },
            social: {
                fields: [
                    { key: 'icon', sortable: true },
                    { key: 'link', sortable: true },
                    { key: 'action' }
                ],
                items: [],
                busy: true
            },
            footer: {
                fields: [
                    { key: 'key', sortable: true },
                    { key: 'value', sortable: true },
                    { key: 'action' }
                ],
                items: [],
                busy: true
            },
            section: {
                items: []
            }
        },
        typeModal: '',
        modalEdit: {},
        modalShow: {},
        clicked: {
            carousel: false,
            video: false,
            about: false,
            alumni: false,
            company: false,
            social: false,
            footer: false,
            section: false
        },
        form: {
            carousel: {
                type: null,
                title: '',
                description: '',
                url: null
            },
            video: {
                thumbnail: null,
                video: null
            },
            alumni: {
                name: '',
                company: '',
                content: '',
                url: null
            },
            company: {
                url: null,
                link: ''
            },
            social: {
                icon: '',
                link: ''
            },
            footer: {
                key: '',
                value: ''
            }
        },
        aboutImg: null,
        videoLoad: 0
    }),
    mounted() {
        const o = this.table

        axios.get('admin/homepage')
            .then(({ data }) => {
                o.carousel.items = data.carousel
                o.carousel.busy = false

                o.about = data.about
                o.section.items = data.section
            })
            .then(() => this.refreshTable('video'))
            .then(() => this.refreshTable('alumni'))
            .then(() => this.refreshTable('company'))
            .then(() => this.refreshTable('social'))
            .then(() => this.refreshTable('footer'))

        window.addEventListener('beforeunload', this.beforeunload)
    },
    methods: {
        edit(type, key) {
            type = type === 'social-media' ? 'social' : type

            this.setModal(type, key, 'edit')
            this.typeModal = type
            this.$bvModal.show('homepage-modal-edit')
        },
        del(type, key) {
            type = type === 'social-media' ? 'social' : type

            this.setModal(type, key)
            this.typeModal = type
            this.$bvModal.show('homepage-modal-del')
        },
        reqTable(type) {
            return axios.get('admin/homepage/' + type)
        },
        send(type, isUpdate = false) {
            this.clicked[type] = true

            const url = 'admin/homepage/' + type + (isUpdate ? isUpdate + '/' + this.modalEdit.id : '/create'),
                f = isUpdate ? this.modalEdit : this.form[type]
            let form = new FormData

            Object.keys(f).forEach(o => {
                let val

                try {
                    val = o === 'video' ? f[o].results[0].url : f[o].fileList[0]
                } catch (e) {
                    val = f[o]
                }
                form.append(o, val)
            })

            axios.post(url, form)
                .then(r => {
                    if (type !== 'section')
                        this.$formulate.reset(type)

                    this.clicked[type] = false
                    this.refreshTable(type)
                    this.videoLoad = 0

                    if (isUpdate === '/update')
                        this.$bvModal.hide('homepage-modal-edit')

                    this.$store.dispatch('alert/set', {
                        toast: this.$bvToast,
                        title: this.$t('success'),
                        text: r.data.message,
                        color: 'success'
                    })
                })
                .catch(e => {
                    this.catchErr(e)
                    this.clicked[type] = false
                })
        },
        destroy(type) {
            this.clicked[type] = true

            axios.delete(`admin/homepage/${type}/delete/${this.modalEdit.id}`)
                .then(r => {
                    this.clicked[type] = false
                    this.refreshTable(type)
                    this.$bvModal.hide('homepage-modal-del')

                    this.$store.dispatch('alert/set', {
                        toast: this.$bvToast,
                        title: this.$t('success'),
                        text: r.data.message,
                        color: 'success'
                    })
                })
                .catch(e => {
                    this.catchErr(e)
                    this.clicked[type] = false
                })
        },
        refreshTable(type) {
            return this.reqTable(type).then(r => {
                const t = this.table[type]

                t.items = []
                t.busy = false

                switch (type) {
                    case 'carousel':
                        r.data.forEach(d => t.items.push({
                            id: d.id,
                            type: d.type,
                            title: d.title,
                            description: d.description,
                            url: d.url
                        }))
                        break
                    case 'video':
                        r.data.forEach(d => t.items.push({
                            id: d.id,
                            thumbnail: d.thumbnail,
                            video: d.video,
                            is_publish: d.is_publish
                        }))
                        break
                    case 'alumni':
                        r.data.forEach(d => t.items.push({
                            id: d.id,
                            name: d.name,
                            company: d.company,
                            content: d.content,
                            url: d.url,
                            is_publish: d.is_publish
                        }))
                        break
                    case 'company':
                        r.data.forEach(d => t.items.push({
                            id: d.id,
                            url: d.url,
                            link: d.link
                        }))
                        break
                    case 'social':
                        r.data.forEach(d => t.items.push({
                            id: d.id,
                            icon: d.icon,
                            link: d.link
                        }))
                        break
                    case 'footer':
                        r.data.forEach(d => t.items.push({
                            id: d.id,
                            key: d.key,
                            value: d.value
                        }))
                        break
                    case 'section':
                        r.data.forEach(d => t.items.push({
                            id: d.id,
                            title: d.title,
                            subtitle: d.subtitle
                        }))
                        break
                }
            })
        },
        videoPublish(id, type = 'video') {
            axios.post(`admin/homepage/${type}/publish/${id}`).then(r => {
                this.refreshTable(type)

                this.$store.dispatch('alert/set', {
                    toast: this.$bvToast,
                    title: this.$t('success'),
                    text: r.data.message,
                    color: 'success'
                })
            }).catch(e => this.catchErr(e))
        },
        setModal(type, key, from = '') {
            this.modalEdit = {}

            if (from === 'show')
                this.modalShow = key
            else
                Object.assign(this.modalEdit, key)

            if (type === 'video' && from === 'edit') {
                this.modalEdit.thumbnail = null
                this.modalEdit.video = null
            }

            if ((type === 'alumni' || type === 'company' || type === 'carousel') && from === 'edit')
                this.modalEdit.url = null
        },
        show(type, key) {
            this.setModal(type, key, 'show')
            this.typeModal = type
            this.$bvModal.show('homepage-modal-show')
        },
        sendAbout() {
            let img,
                form = new FormData
            this.clicked.about = true

            try {
                img = this.aboutImg.fileList[0]
            } catch (e) {
                img = null
            }
            form.append('content', this.table.about.content)
            form.append('url', img)

            axios.post('admin/homepage/about/update', form).then(({ data }) => {
                this.$formulate.reset('about')
                this.clicked.about = false
                this.table.about = data.result

                this.$store.dispatch('alert/set', {
                    toast: this.$bvToast,
                    title: this.$t('success'),
                    text: data.message,
                    color: 'success'
                })
            }).catch(e => {
                this.catchErr(e)
                this.clicked.about = false
            })
        },
        cardTtl(str, key) {
            return this.ttl.length
                ? this.ttl[key].title
                : this.$t(str)
        },
        async uploadFile(file, progress, error, options) {
            try {
                const form = new FormData

                form.append('file', file)

                const result = await axios.post('admin/homepage/upload', form, {
                    onUploadProgress: e => this.videoLoad = Math.round((e.loaded * 100) / e.total)
                })
                progress(100)
                return result.data
            } catch (e) {
                error(this.$t('errors.upload'))
            }
        },
        beforeunload(e) {
            if (this.videoLoad > 0 && this.isLogged)
                e.returnValue = this.$t('confirm_video')
        }
    },
    computed: {
        ...mapGetters(['access', 'isLogged']),
        ttl() {
            return this.table.section.items
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.videoLoad > 0 && this.isLogged) {
            if (window.confirm(this.$t('confirm_video'))) next()
            else next(false)
        } else next()
    },
    destroyed() {
        window.removeEventListener('beforeunload', this.beforeunload)
    }
}
