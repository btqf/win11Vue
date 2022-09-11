import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import routers from '@/router'
import '@/styles/global.css'
import win11UI from '@/plugins'


const app = createApp(App)
app.use(routers)
app.use(win11UI)
app.mount('#app')
