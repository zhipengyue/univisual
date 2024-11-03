import './assets/main.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import VWave from 'v-wave'
import App from './App.vue'
import router from './router'
import {customDeirectives} from '@/directives/index'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(customDeirectives)
// app.use(VWave, {
//   color: 'red',
//   initialOpacity: 1,
//   easing: 'ease-in'
// })
app.mount('#app')
