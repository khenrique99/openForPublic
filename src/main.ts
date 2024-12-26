import { createApp } from 'vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
const app = createApp(App)
// Importação de componentes globais
import ToBack from './components/ToBack.vue';
import Message from './components/Message.vue';
import InputText from './components/InputText.vue';
import InputNumber from './components/InputNumber.vue';
import InputSelect from './components/InputSelect.vue';
import InputTextarea from './components/InputTextarea.vue';
import ButtonComponent from './components/ButtonComponent.vue';

// Configuração do FontAwesome
library.add(fas);

// Criação da instância do Vue e do Pinia;
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // Adicionando o plugin Persist

// Registro dos componentes globais
app.component('ToBack', ToBack);
app.component('Message', Message);
app.component('InputText', InputText);
app.component('InputSelect', InputSelect);
app.component('InputNumber', InputNumber);
app.component('InputTextarea', InputTextarea);
app.component('ButtonComponent', ButtonComponent);
app.component('font-awesome-icon', FontAwesomeIcon);

// Uso de plugins Vue
app.use(router);
app.use(pinia);

// Montagem do aplicativo Vue
app.mount('#app');
