// * Global
import Vue from 'vue';
import App from './App.vue';
// Theme
import './assets/styles/main.scss';

new Vue({
    render: h => h(App)
}).$mount('#app');