import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/utils/axios.js";
import "./style.css";
import "../node_modules/flowbite-vue/dist/index.css";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app");
