import { library } from "@fortawesome/fontawesome-svg-core";

import 'animate.css/animate.css';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import App from './App.vue';
import { createApp } from 'vue';

// Pinia
import { createPinia } from 'pinia';
import router from './router'

//vuex
// import products from './store/index-vuex'
// app.use(products)

import { faShoppingCart, faDollarSign } from "@fortawesome/free-solid-svg-icons";
library.add(faShoppingCart, faDollarSign);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
