import { createApp } from 'vue'
import axios from 'axios'
import './style.css'
import App from './App.vue'


// Obtener token desde cualquier lugar y guardar en localStorage
let token = '16e2f0694a311151c01aa0a131b94a5a3ad7f110e12c2d8f459fcbb158214f5f';
localStorage.setItem('sesame', token);

// Tomar el token de localStorage
token = localStorage.getItem("sesame");

axios.interceptors.request.use(config => {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Content-Type"] = 'application/json;charset=UTF-8';
    return config;
});

createApp(App).mount('#app');