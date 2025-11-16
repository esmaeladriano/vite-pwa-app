import { createApp } from 'vue';
import App from './App.vue';
import { registerServiceWorker } from './registerServiceWorker';
import './styles/main.css';

const app = createApp(App);
app.mount('#app');

registerServiceWorker();