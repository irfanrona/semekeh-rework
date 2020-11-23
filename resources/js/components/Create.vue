<template>
    <div v-if="access[from + '.create']" class="mb-4">
        <b-btn
            class="mb-4"
            variant="primary"
            v-b-toggle="type + '-collapse'"
            @click="clicked = !clicked"
        >
            <fa :icon="clicked ? 'chevron-up' : 'chevron-down'" />
            {{ $t("create") }}
        </b-btn>

        <b-collapse :id="type + '-collapse'">
            <slot></slot>
        </b-collapse>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        type: {
            required: true,
            type: String
        },
        from: {
            required: true,
            type: String
        }
    },
    data: () => ({
        clicked: false
    }),
    computed: {
        ...mapGetters(['access'])
    },
}
</script>
