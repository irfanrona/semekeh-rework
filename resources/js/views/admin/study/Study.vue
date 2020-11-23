<template>
    <div class="my-4">
        <b-container>
            <b-card>
                <data-table :manual="true" type="study-program" :table="table" :edit="edit" />
            </b-card>
        </b-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        table: {
            fields: [
                { key: 'title', sortable: true },
                { key: 'action' }
            ],
            items: [],
            busy: true
        }
    }),
    mounted(){
        if(this.access['study-program.show'])
            axios.get('admin/study')
                .then(r => {
                    this.table.items = r.data
                    this.table.busy = false
                })
        else this.$router.push('/404')
    },
    methods: {
        edit(type, key){
            localStorage.setItem('study', JSON.stringify(key))
            this.$router.push('/admin/study-program/' + key.slug)
        }
    },
    computed: {
        ...mapGetters(['access']),
    }
}
</script>
