declare module 'element-ui/*';

import Vue from "vue";
import ElementUI from "element-ui";
import App from "./App.vue";
import locale from "element-ui/lib/locale/lang/en";
import store from "@/store/store";

Vue.use(ElementUI, { locale });
// window.axios = require("axios");
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
