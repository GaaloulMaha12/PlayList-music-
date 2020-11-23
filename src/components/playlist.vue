<template>
  <v-simple-table class="list-music" dark>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">

        </th>
        <th class="text-left">
          Titres
        </th>
        <th class="text-left">
          Artistes
        </th>
        <th class="text-left">
          Allbum
        </th>
        <th class="text-left">
          Date
        </th>
        <th class="text-left">
          Duré
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in musicList"
          :key="item.id"
      >
        <td> play</td>
        <td>{{ item.name }}</td>
        <td>{{ item.chanteur }}</td>
        <td>{{ item.chanteur }}</td>
        <td>{{ item.chanteur }}</td>
        <td> </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import axios from "axios";

export default {
  name: "playlist",
  data () {
    return {
      musicList: {
        id: 0,
        chanteur: "",
        photo: "",
        name: "",
        lien: ""
      },
    }
  },
  methods: {
    async getAllMusic() {
      let rep = (await axios.get("http://localhost:3000/music"));
      this.musicList = rep.data;
    },
  },
  mounted() {
    this.getAllMusic();
  }
}
</script>
<style>
.list-music {
  margin-top: -20%;
}
</style>