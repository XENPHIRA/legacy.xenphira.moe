import Vue from 'vue'
import App from './App.vue'
import vuetify from '../../plugins/vuetify';

Vue.config.productionTip = false

Vue.use(require("vue-moment"));

import VTooltip from "v-tooltip";
Vue.use(VTooltip);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
