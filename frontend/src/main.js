import { createApp } from "vue";

import "reset.css";
import "./style.scss";
import App from "./App.vue";
import router from "./router";
import "lib-flexible/flexible";

const app = createApp(App);
app.use(router);
app.mount("#app");
