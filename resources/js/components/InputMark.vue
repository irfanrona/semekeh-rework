<template>
    <b-card>
        <template #header>
            <b-nav card-header tabs>
                <b-nav-item
                    v-for="(i, k) in menu"
                    :key="k"
                    :active="active === k"
                    @click="active = k"
                >{{ i }}</b-nav-item>
            </b-nav>
        </template>

        <b-card-body>
            <div v-if="active === 0">
                <div v-if="context.model !== ''">
                    <markdown :content="context.model" @mounted="keyResult" />
                </div>
                <div v-else>
                    <h4 class="text-center text-secondary">{{ $t('markdown.empty') }}</h4>
                </div>
            </div>
            <div v-else-if="active === 1">
                <vue-simplemde v-model="context.model" :configs="config" />
            </div>
            <div v-else>
                <data-table :table="table" type="input-markdown" />
            </div>
        </b-card-body>
    </b-card>
</template>

<script>
import VueSimplemde from 'vue-simplemde'

export default {
    props: {
        context: {
            type: Object,
            required: true
        }
    },
    components: {
        VueSimplemde
    },
    data: () => ({
        menu: [],
        active: 0,
        table: {
            fields: [],
            items: [],
            busy: true
        },
        config: {
            indentWithTabs: false,
            spellChecker: false,
            tabSize: 4,
            toolbar: [
                "heading",
                "bold",
                "italic",
                "strikethrough",
                "|",
                "quote",
                "unordered-list",
                "ordered-list",
                "|",
                "link",
                "image",
                "|",
                "table"
            ],
        },
    }),
    mounted(){
        this.table.fields = [{key: 'origin_key', label: this.$t('keyword'), sortable: true}, {key: 'replace', label: this.$t('value'), sortable: true}]
        this.menu = [this.$t('markdown.result'), this.$t('markdown.input'), this.$t('markdown.help')]
    },
    methods: {
        keyResult(e){
            this.table.items = e
            this.table.busy = false
        }
    },
    computed: {
        model(){
            return this.context.model
        }
    }
}
</script>
