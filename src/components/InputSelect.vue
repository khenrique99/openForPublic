<template>
    <div class="container-select">
        <label>{{ name }}</label>

        <select v-model="selectedvalue" @change="updateValue">
            <option v-for="(item, index) in options"
                :key="index"
                :value="item.acronym"
            >
                {{ item.name }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, watchEffect } from 'vue'
    import type { PropType } from 'vue'

    interface LanguageOption {
        name: string
        acronym: string
    }

    export default defineComponent({
        name: 'InputSelect',
        props: {
            name: {
                type: String,
                required: true
            },
            options: {
                type: Array as PropType<LanguageOption[]>,
                required: true
            },
            default: {
                type: String,
                required: false 
            }
        },

        data() {
            return {
                selectedvalue: ''
            }
        },

        setup(props, { emit }) {
            const selectedvalue = ref('')

            watchEffect(() => {
                selectedvalue.value = props.default || props.options[0]?.acronym || ''
            })

            const updateValue = (event: Event) => {
                const target = event.target as HTMLSelectElement
                emit('update:selected', target.value)
            }

            return {
                selectedvalue,
                updateValue
            }
        }
    })
</script>

<style scoped>
    .container-select {
        background-color: var(--container-color);
        border-radius: 15px;
        padding: 20px;
        position: relative;
    }

    .container-select label {
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

    .container-select select {
        background-color: var(--body-color);
        color: var(--text-color);
        padding: 19px 13px 13px 13px;
        border-radius: 7px;
        font-size: 15px;
        margin-top: 5px;
        width: 100%;
    }
</style>