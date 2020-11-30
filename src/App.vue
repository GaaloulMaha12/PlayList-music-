<template>
  <v-app>
    <v-main>
      <h1>
        <router-link to="/playlist">PlayList-2020</router-link>
      </h1>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {},

  data: () => ({
    prompt:false
    //
  }),
  methods: {
    showUpdateNotification() {
      let snackbarContainer = document.querySelector('#notification-toast-example');
      snackbarContainer.MaterialSnackbar.showSnackbar({
        message: 'Une mise à jour est disponible.',
        timeout: 4000,
        actionHandler: this.update,
        actionText: 'Refraîchir'
      });
    },
    async update() {
       this.prompt = false;
       await this.$workbox.messageSW({ type: "SKIP_WAITING" });
     }
  },
  created() {
    this.showUpdateNotification();
  }
};
</script>
