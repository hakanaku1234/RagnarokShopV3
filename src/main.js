import Vue from 'vue';
// 第三方套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import axios from 'axios';
import VueAxios from 'vue-axios';

import 'bootstrap';
import $ from 'jquery';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import VueTypedJs from 'vue-typed-js';

import VeeValidate, { Validator } from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';

import VDragged from 'v-dragged';

import VCharts from 'v-charts';

// 自訂
import App from './App.vue';
import router from './router';
import store from './store/index';

import './registerServiceWorker';

import currencyFilter from './filter/currency';
import timestampFilter from './filter/timestamp';

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

library.add(fab, far, fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueTypedJs);
Vue.use(VueAxios, axios);

Validator.localize('zh_TW', zhTWValidate);
Vue.use(VeeValidate, {
  locale: 'zh_TW',
  events: 'input|blur',
});

Vue.component('Loading', Loading);

Vue.use(VDragged);

Vue.use(VCharts);

Vue.filter('currency', currencyFilter);
Vue.filter('timestamp', timestampFilter);

window.$ = $;

new Vue({
  router,
  store,
  created() {
    const title = localStorage.getItem('title') || '';
    if (title) {
      document.title = title;
    }
  },
  render: (h) => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
    localStorage.setItem('title', to.meta.title);
  }

  if (to.meta.requiresAuth) {
    const url = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(url).then((response) => {
      if (response.data.success) {
        next();
      } else {
        store.dispatch('updateMessage', {
          message: `登入失敗惹Σ( ° △ °|||)︴${response.data.message}`,
          status: 'danger',
        });
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
