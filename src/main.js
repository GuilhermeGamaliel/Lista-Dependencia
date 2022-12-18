import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { createPinia, PiniaVuePlugin } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

Vue.use(PiniaVuePlugin);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  pinia,
  render: (h) => h(App),
}).$mount("#app");
