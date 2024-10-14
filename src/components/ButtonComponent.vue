<template>
    <div class="button-template">
        <button
            :class="{
                'success': type === 'success',
                'neutral': type === 'neutral',
            }"
        >
            {{ name }}
        </button>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'ButtonComponent',
        props: {
            name: {
                type: String,
                required: true
            },
            type: {
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
        border: none;
        outline: none;
        border-radius: 7px;
        cursor: pointer;
    }

    .success {
        color: rgb(40, 40, 40);
        background-color: rgb(86, 166, 86);
    }

    .neutral {
        color: var(--text-color);
        background-color: var(--container-color);
    }
</style>