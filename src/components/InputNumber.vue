<template>
    <div class="input-template">
        <label>{{ name }}</label>

        <input
            type="number"
            :placeholder="name"
            :max="maxLength"
            :value="currentValue"
            class="input-default"
            @input="updateValue($event)"
        />
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed } from 'vue'

    export default defineComponent({
        name: 'InputNumber',
        props: {
            name: {
                type: String,
                required: true
            },
            modelValue: {
                type: Number,
                required: true
            },
            maxLength: {
                type: Number,
                default: 2
            }
        },

        setup(props, { emit }) {
            const currentValue = computed(() => props.modelValue)

            const updateValue = (event: Event) => {
                const value = (event.target as HTMLInputElement)?.value
                if (value !== undefined) {
                    emit('update:modelValue', value)
                }
            }

            return { currentValue, updateValue }
        },
    })
</script>

<style scoped>
    .input-template {
        background-color: var(--container-color);
        border-radius: 15px;
        padding: 20px;
        position: relative;
    }

    .input-template label {
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

    .input-template input {
        width: calc(100% - 28px);
        font-size: 18px;
        padding: 10px 0px;
        text-indent: 20px;
        background-color: var(--body-color);
        color: var(--text-color);
        font-size: 15px;
        margin-top: 5px;
        border: none;
        outline: none;
        border-radius: 7px;
        padding: 19px 13px 13px 13px;
    }
</style>