<template>
    <div class="container">
        <h1 v-if="error.statusCode === 404">
            Page not exist
        </h1>

        <h1 v-else>Error page</h1>

        <nuxt-link to="/">Home</nuxt-link>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    interface ErrorInterface {
        message: string;
        path?: string;
        statusCode: number;
    }

    export default Vue
            .extend({
                name: 'error-page',
                layout: 'empty',
                props: {
                    error: {
                        type: Object as () => ErrorInterface,
                        default: null,
                    },
                },
                data() {
                    return {
                        message: (this.error && this.error.message) || 'Error page',
                    };
                },
                computed: {
                    statusCode(): number {
                        return (this.error && this.error.statusCode) || 500;
                    },
                },
                head() {
                    return {
                        title: this.$data.message,
                        meta: [
                            {
                                name: 'viewport',
                                content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0',
                            },
                        ],
                    };
                },
            });
</script>
