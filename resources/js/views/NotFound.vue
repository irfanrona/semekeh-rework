<template>
    <b-container class="h-100-vh">
        <b-row class="h-100 align-items-center">
            <b-col cols="12" class="text-bpi-yellow text-center">
                <h1 style="font-size: 5rem">404</h1>
                <h4 class="text-bpi-blue" v-if="rng()">{{ quote[Math.floor(Math.random() * quote.length)] }}</h4>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    data: () => ({
        quote: [
            'Oh no, Anyway..',
            'Hmmm yes this page was made out of page',
            'Finally, not found',
            'r/woosh'
        ]
    }),
    methods: {
        rng(){
            return Math.floor(Math.random() * 41) > Math.floor(Math.random() * 61)
        }
    }
}
</script>
