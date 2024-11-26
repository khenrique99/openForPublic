<template>
    <div class="message-system" :class="{ 'error': type == 'error', 'success': type == 'success' }">
        <h1>{{ messageText }}</h1>

        <font-awesome-icon icon="rectangle-xmark" class="icon-close-modal" @click="closeMessage" />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'Message',
        props: {
            type: {
                type: String,
                required: true
            },
            messageText: {
                type: String,
                required: true
            }
        },

        methods: {
            closeMessage() {
                this.$emit('close-message')
            }
        }
    });
</script>

<style scoped>
    .message-system {
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 999;
    }
    
    .error {
        background-color: red;
    }

    .success {
        background-color: rgb(30, 128, 15);
    }

    .message-system h1 {
        color: white;
        padding: 0px;
        font-size: 25px;
        text-align: left;
        text-indent: 20px;
    }
    
    .icon-close-modal {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 40px;
        margin-right: 10px;
        margin-bottom: 10px;
        color: white;
        cursor: pointer;
    }
</style>