import Vue from 'vue';
import BalmUI from 'balm-ui';
import BalmUIPlus from 'balm-ui-plus';

import App from './App.vue';

import 'balm-ui-css';


Vue.config.productionTip = false;

Vue.use(BalmUI);
Vue.use(BalmUIPlus);

new Vue({
  render: h => h(App),
}).$mount('#app');
