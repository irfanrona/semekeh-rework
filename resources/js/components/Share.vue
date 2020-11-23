<template>
    <b-row class="my-4">
        <b-col class="share-text" cols="12">
            <a
                class="mx-1"
                :href="`http://twitter.com/share?text=${encodeURIComponent(title)}&url=${appURL + $route.fullPath}`"
                target="_blank"
                rel="noopener"
            >
                <b-avatar variant="bpi-blue">
                    <fa :icon="['fab', 'twitter']" />
                </b-avatar>
            </a>
            <a
                class="mx-1"
                :href="`https://www.facebook.com/sharer/sharer.php?u=${appURL + $route.fullPath}`"
                target="_blank"
                rel="noopener"
            >
                <b-avatar variant="bpi-blue">
                    <fa :icon="['fab', 'facebook-f']" />
                </b-avatar>
            </a>
            <a
                class="mx-1"
                :href="`https://web.whatsapp.com/send?text=${appURL + $route.fullPath}`"
                target="_blank"
                rel="noopener"
            >
                <b-avatar variant="bpi-blue">
                    <fa :icon="['fab', 'whatsapp']" />
                </b-avatar>
            </a>
            <a
                class="mx-1"
                :href="`mailto:?subject=${encodeURIComponent(title)}&amp;body=${appURL + $route.fullPath}`"
                target="_blank"
                rel="noopener"
            >
                <b-avatar variant="bpi-blue">
                    <fa icon="envelope" />
                </b-avatar>
            </a>
        </b-col>
    </b-row>
</template>

<script>
export default {
    props: {
        title: {
            required: true,
            type: String
        }
    }
}
</script>
