<template>
    <div class="button-template">
        <button>
            {{ name }}
        </button>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'ButtonConfirm',
        props: {
            name: {
                type: String,
                required: true
            }
        },
    })
</script>

<style scoped>
    .button-template {
        position: relative;
        width: 100%;
    }
    .button-template button {
        width: 100%;
        font-size: 18px;
        padding: 10px 0px;
        color: rgb(40, 40, 40);
        background-color: rgb(86, 166, 86);
        border: none;
        outline: none;
        border-radius: 7px;
        cursor: pointer;
    }
</style>