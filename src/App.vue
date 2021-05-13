<template>
  <div id="app">
    <div class="header">
      <div class="controls">
        <label for="base">Base Color</label>
        <input type="color" name="base" v-model="baseColor" />
      </div>
      <h1 class="title" :style="{ color: baseColor }">
        Medicine expiry date tracker
      </h1>
      <div class="current-date">
        {{ currentDate }}
      </div>
    </div>
    <MedicineCarts />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MedicineCarts from "./components/MedicineCarts.vue";
import moment from "moment";

@Component({
  components: {
    MedicineCarts,
  },
})
export default class App extends Vue {
  baseColor = "#ffc600";
  currentDate = moment(new Date().setHours(0, 0, 0, 0)).format("DD/MM/YYYY");
}
</script>

<style>
#app {
  font-family: Arial;
  text-align: center;
  min-width: 100vw;
  min-height: 100vh;
  background-image: url("./assets/background.jpg");
}

body {
  margin: 0px;
  padding: 0px;
}

.header {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 10vh;
  place-content: center;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Goudy Old Style;
  font-weight: bold;
}

.current-date {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
  color: white;
}

label {
  color: white;
  margin-right: 10px;
}
</style>
