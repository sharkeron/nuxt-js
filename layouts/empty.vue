<template>
    <div class="empty-layout">
        <nuxt/>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'empty',
    });
</script>

<style lang="scss"
       scoped>
    .empty-layout {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
</style>
