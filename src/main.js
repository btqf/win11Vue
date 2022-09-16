import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import stores from '@/store';
import routers from '@/router'
import '@/styles/style.css'
import win11UI from '@/plugins'


const app = createApp(App)
app.use(stores)
app.use(routers)
app.use(win11UI)
app.mount('#app')
