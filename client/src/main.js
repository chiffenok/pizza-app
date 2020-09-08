import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import { store } from './store/index';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Global configuration for axios
// Change base URL here!!
axios.defaults.baseURL = 'http://localhost:5000/api';

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
