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

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
