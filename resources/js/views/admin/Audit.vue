<template>
    <div>
        <b-container class="my-4">
            <b-card>
                <b-row v-if="!table.busy" class="mb-4">
                    <b-col cols="6">
                        <label>{{ $t('start_date') }}</label>
                        <b-form-datepicker v-model="a" />
                    </b-col>
                    <b-col cols="6">
                        <label>{{ $t('end_date') }}</label>
                        <b-form-datepicker :disabled="a === null" :min="new Date(a)" v-model="b" />
                    </b-col>
                </b-row>
                <data-table :manual="true" type="audits" :table="data" :show="show" />
            </b-card>
        </b-container>

        <b-modal id="show" :title="$t('detail')" hide-footer>
            <b-row>
                <b-col v-for="(i, k) in Object.keys(modal)" :key="k" cols="12">
                    <strong>{{ i.replace(/_/g, ' ') }}</strong>
                    <div v-if="i === 'old_values' || i === 'new_values'">
                        <pre>{{ JSON.stringify(JSON.parse(modal[i]), null, 4) }}</pre>
                    </div>
                    <div v-else-if="i === 'event'">
                        <p :class="warn(modal[i])">
                            <strong>{{ modal[i] }}</strong>
                        </p>
                    </div>
                    <div v-else>
                        <p>{{ modal[i] }}</p>
                    </div>
                </b-col>
            </b-row>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        table: {
            fields: [
                { key: 'by_user', sortable: true },
                { key: 'module', sortable: true },
                { key: 'event', sortable: true },
                { key: 'created_at', sortable: true },
                { key: 'action' },
            ],
            items: [],
            busy: true
        },
        modal: {},
        a: null,
        b: null
    }),
    mounted(){
        if(this.access['audits.show'])
            axios.get('admin/audit')
                .then(r => {
                    this.table.items = r.data
                    this.table.busy = false
                })
        else this.$router.push('/404')
    },
    methods: {
        show(type, key){
            this.modal = key
            this.$bvModal.show('show')
        },
        warn(value){
            return value === 'created'
                ? 'text-info'
                : value === 'updated'
                    ? 'text-success'
                    : value === 'deleted'
                        ? 'text-danger'
                        : ''
        }
    },
    computed: {
        ...mapGetters(['access']),
        data(){
            let a = this.table

            if(this.a && this.b)
                a = {
                    ...a,
                    items: a.items.filter(x => {
                        const z = new Date(x.created_at)

                        return z >= new Date(this.a) && z <= new Date(this.b)
                    })
                }

            return a
        }
    },
}
</script>
