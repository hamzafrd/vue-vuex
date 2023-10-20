import { library } from "@fortawesome/fontawesome-svg-core";

import 'animate.css/animate.css';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import { createApp } from 'vue';
// Pinia
// import { createPinia } from 'pinia';

import App from './App.vue';
import { faShoppingCart, faDollarSign } from "@fortawesome/free-solid-svg-icons";

import router from './router'
import products from './store'

library.add(faShoppingCart, faDollarSign);
createApp(App).use(router).use(products).mount('#app')
