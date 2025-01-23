import './assets/index.css'

import axios from "axios";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";

import App from "./AppWithErrorWrapper.vue";
import router from "./router";

axios.defaults.baseURL = "."
axios.defaults.withCredentials = true;

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
