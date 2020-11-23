import { mapGetters } from 'vuex'

export default {
    data: () => ({
        table: {
            fields: [
                { key: 'url' },
                { key: 'action' },
            ],
            items: [],
            busy: true
        },
        tablee: {
            fields: [
                { key: 'thumbnail' },
                { key: 'action' },
            ],
            items: [],
            busy: true
        },
        ready: false,
        img: null,
        video: {
            thumbnail: null,
            video: null
        },
        id: 0,
        clicked: false,
        videoLoad: 0,
        videoLink: '',
        modal: {}
    }),
    mounted() {
        if (this.access['gallery.show'])
            this.render()
        else this.$router.push('/404')
    },
    methods: {
        render() {
            axios.get('admin/media/gallery')
                .then(r => {
                    this.table.items = r.data
                    this.table.busy = false
                    this.ready = true
                })
                .then(() => this.renderVid())
        },
        renderVid() {
            axios.get('admin/homepage/video')
                .then(r => {
                    this.tablee.items = r.data
                    this.tablee.busy = false
                })
        },
        del(type, key) {
            this.id = key.id
            this.videoLink = type === 'video' ? 'admin/homepage/video/delete/' + key.id : ''
            this.$bvModal.show('modal-del')
        },
        sendImg() {
            const f = new FormData
            this.clicked = true

            f.append('url', this.img.fileList[0])

            axios.post(`admin/media/gallery/create`, f)
                .then(r => {
                    this.$formulate.reset('gallery')
                    this.clicked = false
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
                    this.clicked = false
                })
        },
        delImg() {
            this.clicked = true

            axios.delete(this.videoLink !== '' ? this.videoLink : 'admin/media/gallery/delete/' + this.id)
                .then(r => {
                    this.clicked = false

                    if (this.videoLink !== '')
                        this.render()
                    else this.renderVid()

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
                    this.clicked = false
                })
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
        show(type, key) {
            this.modal = key
            this.$bvModal.show('show')
        },
        videoPublish(id) {
            axios.post(`admin/homepage/video/publish/${id}`).then(r => {
                this.renderVid()

                this.$store.dispatch('alert/set', {
                    toast: this.$bvToast,
                    title: this.$t('success'),
                    text: r.data.message,
                    color: 'success'
                })
            }).catch(e => this.catchErr(e))
        },
        send() {
            const f = this.video,
                form = new FormData

            this.clicked = true

            Object.keys(f).forEach(o => {
                let val

                try {
                    val = o === 'video' ? f[o].results[0].url : f[o].fileList[0]
                } catch (e) {
                    val = f[o]
                }
                form.append(o, val)
            })

            axios.post('admin/homepage/video/create', form)
                .then(r => {
                    this.$formulate.reset('video')
                    this.clicked = false
                    this.videoLoad = 0
                    this.renderVid()

                    this.$store.dispatch('alert/set', {
                        toast: this.$bvToast,
                        title: this.$t('success'),
                        text: r.data.message,
                        color: 'success'
                    })
                })
        }
    },
    computed: {
        ...mapGetters(['access'])
    }
}
