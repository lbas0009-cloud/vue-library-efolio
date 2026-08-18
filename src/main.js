import { createApp } from 'vue'
import App from './App.vue'

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'
//import './style.css'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false
        }
    }
})

app.mount('#app')
