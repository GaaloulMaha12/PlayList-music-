<template>
  <div class="container">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
              class="white--text"

              :src="MusicDetails.photo"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">{{MusicDetails.artist.chanteur}}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title>
            <div>
              <span class="grey--text">{{  MusicDetails.artist.chanteur }}</span><br>

              <p>{{  MusicDetails.artist.description }}</p>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import axios from "axios";

const  MUSIC_API_ENDPOINT ='http://localhost:3000/music/';
export default {
  name: "detailArtist",
  data() {
    return {
      MusicDetails: {
      },
    };
  },
  created() {
    this.getMusicDetails();


  },
  methods: {
    async getMusicDetails() {
      let { musicId } = this.$route.params;
      let rep = (await axios.get(`${MUSIC_API_ENDPOINT}${musicId}`));
      this.MusicDetails = rep.data;

    },

  }
}
</script>
<style>

</style>