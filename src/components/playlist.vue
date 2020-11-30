<template>
    <v-container>
      <v-row>
<!--        <v-col>-->
<!--          <v-card  class="mx-auto"    max-width="400">-->
<!--            <v-img  height="200px"  :src="musicList[countMusic].photo"/>-->
<!--          </v-card>-->
<!--          <v-container>-->
<!--            <v-row>-->
<!--              <v-col>-->
<!--                <knob-control-->
<!--                    :min="-64"-->
<!--                    :max="63"-->
<!--                    :size="75"-->
<!--                    primary-color="#E844C3"-->
<!--                    secondary-color="#E7B6DC"-->
<!--                    text-color="#E844C3"-->
<!--                    v-model="someValue"-->
<!--                ></knob-control>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </v-container>-->
<!--        </v-col>-->
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
                  <v-btn outlined icon class="ma-2" @click="prec()">
                    <v-icon>mdi-skip-previous</v-icon>
                  </v-btn>
                </v-col>
                <v-col sm="6">
                  <v-card-title>{{musicList[countMusic].name}}</v-card-title>
                </v-col>
                <v-col sm="3">
                  <v-btn outlined icon class="ma-2" @click="next()">
                    <v-icon>mdi-skip-next</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <vuetify-audio style="width: 100%" v-model="audio" color="success" ></vuetify-audio>
            </v-card-actions>
            <div>

            </div>
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

              <v-toolbar-title>My Music list</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-dialog
                  v-model="dialog"
                  width="500"
              >
                <template v-slot:activator="{ on }">
                  <v-btn color="white" v-on="on" style="color:black">favorite songs </v-btn>
                </template>

                <v-card>
                  <v-card-title
                      class="headline pink lighten-2"
                      primary-title
                  >
                    favorite songs
                  </v-card-title>

                  <v-card-text>
                  <div  v-for="(music, i) in favoriteMusic"
                        :key="i">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title> {{ music }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </div>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        flat
                        @click="dialog = false"
                    >
                     Fermer
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-app-bar>
            <div>
              <input
                  style="width: 100%;padding: 10px; font-size: 15px"
                  v-model="search"
                  type="search"
                  required
                  placeholder="Rechercher une chanson par son titre"
              />

            </div>
            <v-container>
              <v-row dense>
                <v-col cols="12">
                  <v-col
                      v-for="(music, i) in filteredMusic"
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

                          <v-card-subtitle>{{ music.artist.chanteur }}</v-card-subtitle>

                          <v-btn :color="music.color" @click="getArtistDetails(music.id)"> detail artiste </v-btn>
                        <v-icon class="favoris" @click="addToFavoriteMusicList(music.name)">mdi-heart</v-icon>
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
                              <v-icon>mdi-play</v-icon>
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
                              <v-icon>mdi-pause</v-icon>
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
</template>


<script>
import axios from "axios";
import KnobControl from 'vue-knob-control'
export default {
  name: "playlist",
  data: function () {
    return {
      someValue:5,
      dialog:false,
      search:"",
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
      favoriteMusic: []
    };
  },
  component: { KnobControl,
    VuetifyAudio: () => import('vuetify-audio'),
  },
  computed:{
    filteredMusic() {
      return  this.musicList.filter(post => {
        return post.name.toLowerCase().includes(this.search.toLowerCase())
      });
    }
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
    getArtistDetails(musicId) {
      this.$router.push({ name:'nomMusique', params:{musicId} })
    },
    addToFavoriteMusicList(musicName) {
     this.favoriteMusic.push(musicName);
    },

  },
  created() {
    this.getAllMusic();
  }
}
</script>
<style>
.favoris {
  margin-left:15px;
}

</style>