<template>
    <div>
        <b-container class="my-4">
            <b-card>
            	<router-link v-if="access['role.create']" class="btn btn-primary mb-4" to="/admin/user-management/role/create">
            		{{ $t('create') }}
            	</router-link>
                <data-table :manual="true" type="role" :table="table" :edit="edit" :del="del" />
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
                { key: 'name', sortable: true },
                { key: 'action' }
            ],
            items: [],
            busy: true
        },
        modal: {},
        clicked: false
    }),
    mounted(){
        if(this.access['role.show'])
            this.render()
        else this.$router.push('/404')
    },
    methods: {
        render(){
            axios.get('admin/role')
                .then(r => {
                    this.table.items = r.data
                    this.table.busy = false
                })
        },
        edit(type, key){
        	this.$router.push('/admin/user-management/role/create/' + key.id)
        },
        del(type, key){
            this.modal = key
            this.$bvModal.show('del')
        },
        destroy(id){
            this.clicked = true

            axios.delete('admin/role/delete/' + id)
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
