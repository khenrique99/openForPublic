import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ToBack from '@/components/ToBack.vue'
import InputNumber from '@/components/InputNumber.vue'
import ButtonConfirm from '@/components/ButtonConfirm.vue'
import Message from '@/components/Message.vue'

library.add(fas);

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('ToBack', ToBack)
app.component('InputNumber', InputNumber)
app.component('ButtonConfirm', ButtonConfirm)
app.component('Message', Message)
app.use(router)
app.mount('#app')
