<template>
    <div class="default-layout">
        <Navbar/>

        <main>
            <div class="container">
                <nuxt/>
            </div>
        </main>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Navbar from '~/components/Navbar.vue';

    export default Vue.extend({
        components: {
            Navbar,
        },
    });
</script>

<style lang="scss"
       scoped>
    .default-layout {
        min-height: 100vh;

        main {
            min-height: calc(100vh - 56px);
        }
    }
</style>
