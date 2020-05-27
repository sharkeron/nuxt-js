<template>
    <div class="home-page">
        <h2>
            Test application
        </h2>

        <div class="home-page__description">
            <p>The application is created using the following technologies:</p>

            <ul>
                <li>Vue.js;</li>
                <li>VueX;</li>
                <li>Nuxt.js.</li>
            </ul>

            <p>Data is requested from <a class=""
                                         href="https://randomuser.me"
                                         target="_blank">randomuser.me</a></p>

            <p v-if="!hasToken">For further interaction, need authorization on the
                <nuxt-link to="/login">login page</nuxt-link>
            </p>

            <span v-else>
                <nuxt-link to="/users">To the list of users</nuxt-link>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'home',
        head() {
            return {
                title: 'About',
            };
        },
        computed: {
            hasToken(): boolean {
                return this.$store.getters.hasToken;
            },
        },
    });
</script>

<style lang="scss"
       scoped>
    .home-page {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;
        min-height: calc(100vh - 56px);

        h2 {
            margin-bottom: 2rem;
        }

        &__description {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            padding: 20px;
            border: 1px solid #cccccc;
        }
    }
</style>
