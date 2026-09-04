import { createApp } from 'vue'
import App from './App.vue'

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'
//import './style.css'

import router from './router' // Import the router instance
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

// import { initializeApp } from "firebase/app";

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyBf797rTOGRSwx7go1YV6kyTFZ5y7H5j50",
//     authDomain: "fit5032-8102c.firebaseapp.com",
//     projectId: "fit5032-8102c",
//     storageBucket: "fit5032-8102c.firebasestorage.app",
//     messagingSenderId: "212868917712",
//     appId: "1:212868917712:web:6d614e65f309f961c5b1d5",
//     measurementId: "G-Q2XVF8G3NQ"
//   };
  
//   // Initialize Firebase
// initializeApp(firebaseConfig);
import './firebase'

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false
        }
    }
})

app.use(router) // Use the router instance in the Vue app
app.mount('#app')
