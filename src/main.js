import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import stores from '@/store'
import routers from '@/router'
import '@/styles/style.scss'
import win11UI from '@/plugins'
import initDirectives from '@/utils/directive'
import VueLazyload from 'vue-lazyload'


const app = createApp(App);
app.use(VueLazyload, {
    lazyComponent: true
});
app.use(stores);
app.use(routers);
app.use(win11UI);
initDirectives(app);
app.mount('#app');
