<template>
  <v-app>
    <v-main>
            <playlist/>
    </v-main>
  </v-app>
</template>

<script>
import playlist from './components/playlist';
export default {
  name: 'App',

  components: {
    playlist,

  },

  data: () => ({
    //
  }),
};
</script>
