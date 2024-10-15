import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import ToBack from '@/components/ToBack.vue'
import Message from '@/components/Message.vue'
import InputNumber from '@/components/InputNumber.vue'
import InputSelect from '@/components/InputSelect.vue'
import InputTextarea from '@/components/InputTextarea.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas);
const app = createApp(App)

app.component('ToBack', ToBack)
app.component('Message', Message)
app.component('InputSelect', InputSelect)
app.component('InputNumber', InputNumber)
app.component('InputTextarea', InputTextarea)
app.component('ButtonComponent', ButtonComponent)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.mount('#app')
