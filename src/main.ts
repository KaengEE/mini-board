import { createApp } from 'vue'
import App from './App.vue'
//부트스트랩
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(router).mount('#app')
