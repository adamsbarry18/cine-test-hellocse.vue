import './assets/style/index.scss';
import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createORM } from 'pinia-orm';
import { i18n } from './i18n';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from './router';

// Vuetify
import { vuetify } from './assets/style/themes/vuetify';

const app = createApp(App);

app.use(vuetify);
app.use(i18n);

const pinia = createPinia();
pinia.use(createORM());
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(router);

app.mount('#app');
