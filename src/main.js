import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'

import './assets/main.css'

createApp(App)
.use(VueAxios, axios)
.mount('#app')
