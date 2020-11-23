<template>
  <v-app>
  <navbar-play-list/>

    <v-main>
<!--      <HelloWorld/>-->
    <playlist/>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import playlist from './components/playlist';
import navbarPlayList from './components/navbarPlayList';
export default {
  name: 'App',

  components: {
    playlist,
    navbarPlayList
  },

  data: () => ({
    //
  }),
};
</script>
