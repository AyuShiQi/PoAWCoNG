import { createApp } from 'vue'
import Viog from 'viog-ui'
import './style.css'
import 'viog-ui/dist/viog-ui.css'
import App from './App.vue'

createApp(App)
.use(Viog)
.mount('#app')
