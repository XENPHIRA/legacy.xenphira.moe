import Vue from 'vue'
import Timeline from './Timeline.vue'
import vuetify from '../../plugins/vuetify';

import VueHorizontalTimeline from "vue-horizontal-timeline";
Vue.use(VueHorizontalTimeline);

Vue.config.productionTip = false

import VTooltip from "v-tooltip";
Vue.use(VTooltip);

new Vue({
  vuetify,
  render: h => h(Timeline)
}).$mount('#app')
