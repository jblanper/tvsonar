import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BalmUI from 'balm-ui';
import BalmUIPlus from 'balm-ui-plus';

import App from './App.vue'

import 'balm-ui-css';


Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(BalmUI);
Vue.use(BalmUIPlus);

new Vue({
  render: h => h(App),
}).$mount('#app')
