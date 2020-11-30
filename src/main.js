import Vue from 'vue'
import KnobControl from 'vue-knob-control'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'



Vue.use(VueRouter, vuetify, KnobControl)
Vue.config.productionTip = false

const routes = [
  {
    path: '/playlist', name:'playlist',
    component: () => import('./components/playlist.vue'),
  },
  {
    path: '/playlist/:musicId', name:'nomMusique',
    component: () => import('./components/detailArtist.vue'),
  }
  ]

const router = new VueRouter({
  routes
})
new Vue({
  router,
  vuetify,
  KnobControl,
  render: h => h(App)
}).$mount('#app')

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(() => {
    // Le Service Worker est déclaré !
    console.log('Service Worker déclaré !');
  })
      .catch(error => {
        // Il y a eu un problème
        console.error('Erreur: ', error);
      });
}
