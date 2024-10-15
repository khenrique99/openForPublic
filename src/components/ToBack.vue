<template>
    <div class="to-back">
        <router-link to="/">
            <font-awesome-icon icon="arrow-left" class="icon" />
        </router-link>
        <h1>{{ title }}</h1>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'ToBack',

        props: {
            title: {
                type: String,
                required: true
            }
        },

        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    .to-back {
        font-size: 20px;
        margin: 0 auto;
        padding: 20px;
        padding-bottom: 0px!important;
        display: inline-flex;
    }
    .to-back h1 {
        font-size: 20px;
        text-align: left;
        padding: 0px;
        margin-left: 10px;
        margin-top: 8px;
    }
</style>