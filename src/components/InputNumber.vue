<template>
    <div class="input-template">
        <input
            type="number"
            :placeholder="name"
            :max="maxLength"
            :value="currentValue"
            class="input-default"
            @input="updateValue($event)"
        />

        <font-awesome-icon icon="xmark" v-if="clearInput" class="icon-input-clear" @click="clear" />
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed } from 'vue';

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
            },
            clearInput: {
                type: Boolean,
                default: false
            }
        },

        setup(props, { emit }) {
            const currentValue = computed(() => props.modelValue);

            const updateValue = (event: Event) => {
                const value = (event.target as HTMLInputElement)?.value;
                if (value !== undefined) {
                    emit('update:modelValue', value);
                }
            };

            const clear = () => {
                emit('update:modelValue', '');
            };

            return { currentValue, updateValue, clear };
        },
    })
</script>

<style scoped>
    .input-template {
        position: relative;
        width: 100%;
    }
    .input-default {
        width: 100%;
        font-size: 18px;
        padding: 10px 0px;
        text-indent: 20px;
        color: var(--text-container-color);
        background-color: var(--container-color);
        border: none;
        outline: none;
        border-radius: 7px;
    }
</style>