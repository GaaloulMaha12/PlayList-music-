<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-card
              class="mx-auto"
              max-width="400"
          >
            <v-img
                class="white--text align-end"
                height="200px"
                :src="musicList[countMusic].photo"
            >
            </v-img>
            <v-container>
              <v-row>
                <v-col  sm="3">
                  <v-btn outlined icon class="ma-2" @click="play()">
                    <v-icon @click="play" >mdi-play</v-icon>
                  </v-btn>
                  <v-btn outlined icon class="ma-2" @click="stop()">
                    <v-icon>mdi-pause</v-icon>
                  </v-btn>
                </v-col>
                <v-col sm="6"  >
                  <v-card-title>{{ musicList[countMusic].chanteur}}</v-card-title>
                  <v-card-subtitle>{{musicList[countMusic].name}}</v-card-subtitle>
                </v-col>
                <v-col sm="3">
                  <v-btn outlined icon class="ma-2" @click="next()">
                    <v-icon>mdi-skip-next</v-icon>
                  </v-btn>
                  <v-btn outlined icon class="ma-2" @click="prec()">
                    <v-icon>mdi-skip-previous</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <vuetify-audio style="width: 100%" v-model="audio" color="success" ></vuetify-audio>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card
              style=" max-width:400px"
              class="mx-auto"
          >
            <v-system-bar
                color="pink darken-2"
                dark
            >
              <v-spacer></v-spacer>

              <v-icon>mdi-window-minimize</v-icon>

              <v-icon>mdi-window-maximize</v-icon>

              <v-icon>mdi-close</v-icon>
            </v-system-bar>

            <v-app-bar
                dark
                color="pink"
            >
              <v-app-bar-nav-icon></v-app-bar-nav-icon>

              <v-toolbar-title>My Music</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-app-bar>

            <v-container>
              <v-row dense>
                <v-col cols="12">
                  <v-col
                      v-for="(music, i) in musicList"
                      :key="i"
                      cols="12"

                  >
                    <v-card
                        :color="music.color"
                        dark
                    >
                      <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                          <v-card-title
                              class="headline"
                          > {{music.name}}</v-card-title>

                          <v-card-subtitle>lara</v-card-subtitle>

                          <v-card-actions>
                            <v-btn
                                class="ml-2 mt-3"
                                fab
                                icon
                                height="40px"
                                right
                                width="40px"
                                @click="playMusic(music.id)"
                            >
                            play
                            </v-btn>
                            <v-btn
                                class="ml-2 mt-3"
                                fab
                                icon
                                height="40px"
                                left
                                width="40px"
                                @click="stop(music.id)"
                            >
                        pause
                            </v-btn>
                          </v-card-actions>
                        </div>
                        <v-avatar
                            class="ma-3"
                            size="125"
                            tile
                        >
                          <v-img :src="music.photo" ></v-img>
                        </v-avatar>
                      </div>
                    </v-card>
                  </v-col>
                </v-col>
              </v-row>

            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "playlist",
  data: function () {
    return {
      musicList: {
        id: 0,
        chanteur: "",
        photo: "",
        name: "",
        lien: ""
      },
      file: "",
      countMusic:0,
      audio:"",
      color:"",

    };
  },
  component: {
    VuetifyAudio: () => import('vuetify-audio'),
  },
  methods: {
    async getAllMusic() {
      let rep = (await axios.get("http://localhost:3000/music"));
      this.musicList = rep.data;
    },
    play() {

      this.audio =  new Audio (this.musicList[this.countMusic].lien);
      this.audio.play();
    },
    playMusic(id) {

      this.countMusic = id;
      this.audio =  new Audio (this.musicList[this.countMusic].lien);
      this.audio.play();
    },
    stop() {

      this.audio.pause();
    },
    next() {
      this.stop();
      this.countMusic = this.countMusic + 1;
      this.play();
    },
    prec() {
      this.stop();
      this.countMusic = this.countMusic - 1;
      this.play();
    },
    // getDetails(musicId) {
    //   this.$router.push({name: 'nomMusique', params: {musiqueId:musicId}} );
    // }
  },
  mounted() {
    this.getAllMusic();
  }
}
</script>
<style>

</style>