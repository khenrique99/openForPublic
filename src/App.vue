<script setup lang="ts">
    import { RouterView } from 'vue-router'
    import Menu from '@/components/Menu.vue'
</script>

<template>
    <Menu />

    <RouterView />
</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');

    :root {
        --body-color: #d2d4e7;
        --text-color: #4f5165;
        --container-color: #9fa2ba;
        --shadow-color: #a0a3ba;
        --text-container-color: #e9eaf0;
        --color-green: #167120;
        --color-neutral: #676767;
        --color-red: #a53939;
    }

    [data-theme='dark'] {
        --body-color: #0c1d26;
        --text-color: #8cacbd;
        --container-color: #152e3b;
        --shadow-color: #061218;
        --text-container-color: #d2e5f0;
        --color-green: #3c9646;
        --color-neutral: #a9a9a9;
        --color-red: #ea6666;
    }

    body {
        margin: 0 auto;
        padding: 0;
        background-color: var(--body-color);
        font-family: "Comfortaa", sans-serif;
        font-optical-sizing: auto;
        font-style: normal;
    }

    h1 {
        font-size: 35px;
        text-align: center;
        padding: 20px;
    }

    .mt--5 {
        margin-top: -5px;
    }

    .container {
        padding-bottom: 30px;
    }

    .container h1 {
        color: var(--text-color);
    }

    .icon-default {
        color: var(--text-color);
        font-size: 20px;
        padding: 7px;
        width: 27px;
    }

    .icon-default:hover {
        background-color: var(--body-color);
        color: var(--text-color);
        border-radius: 15px;
    }

    .icon {
        background-color: var(--container-color);
        color: var(--body-color);
        border-radius: 15px;
        font-size: 20px;
        padding: 7px;
        width: 27px;
    }

    .color-green {
        color: var(--color-green)!important;
    }

    .color-neutral {
        color: var(--color-neutral)!important;
    }

    .color-red {
        color: var(--color-red)!important;
    }

    .row {
        display: flex;
    }

    .division-grid-spacing {
        height: 5px;
        border-bottom: 1px dotted var(--text-color);
        margin-bottom: 20px;
        margin-top: 20px;
    }
</style>