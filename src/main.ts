import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import VWave from 'v-wave'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(VWave, {
//   color: 'red',
//   initialOpacity: 1,
//   easing: 'ease-in'
// })
app.mount('#app')
