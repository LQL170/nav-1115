import { createApp } from "vue";
import App from "./App.vue";
import { icon } from "./components/icon";

import "./styles/index.css";

import "./plugins/theme";

createApp(App).use(icon).mount("#app");
