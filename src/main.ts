import '@/assets/styles/main.css';
import '@/assets/styles/normalize.css';

import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

app.mount('#app');