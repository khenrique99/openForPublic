<template>
    <div class="container-textarea">
        <label>{{ name }}</label>

        <textarea v-model="localText" @input="handleText"></textarea>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'InputTextarea',
        props: {
            name: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: false,
                default: ''
            }
        },

        data() {
            return {
                localText: this.text
            }
        },

        methods: {
            handleText() {
                this.$emit('update:text', this.localText)
            }
        },

        watch: {
            text(newValue) {
                this.localText = newValue
            }
        }
    })
</script>

<style scoped>
    .container-textarea {
        background-color: var(--container-color);
        border-radius: 15px;
        padding: 20px;
        position: relative;
    }

    .container-textarea label {
        color: var(--body-color);
        background-color: var(--text-color);
        position: absolute;
        top: 0;
        left: 0;
        margin-top: 12px;
        margin-left: 20px;
        padding: 4px 6px;
        z-index: 1;
        border-radius: 7px 7px 7px 0px;
    }

    .container-textarea textarea {
        background-color: var(--body-color);
        color: var(--text-color);
        padding: 19px 13px 13px 13px;
        border-radius: 7px;
        font-size: 15px;
        margin-top: 5px;
        min-height: 200px;
        max-height: 350px;
        min-width: calc(100% - 28px);
        max-width: calc(100% - 28px);
    }
</style>