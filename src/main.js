import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

if ('serviceWorker' in navigator) {
    // eslint-disable-next-line no-unused-vars
    navigator.serviceWorker.register('service-worker.js').then(registration => {
        // Le Service Worker est déclaré !
        console.log('Service Worker déclaré !');
    })
        .catch(error => {
            // Il y a eu un problème
            console.error('Erreur: ', error);
        });
}

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

