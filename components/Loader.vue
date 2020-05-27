<template>
    <div class="ring-loader"></div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'Loader',
    });
</script>

<style lang="scss"
       scoped>
    .ring-loader {
        display: inline-block;
        width: 80px;
        height: 80px;

        &:after {
            display: block;
            width: 64px;
            height: 64px;
            margin: 8px;
            content: "";
            animation: rotate 1.2s linear infinite;
            border: 6px solid;
            border-color: #2f495e transparent #2f495e transparent;
            border-radius: 50%;
        }
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
