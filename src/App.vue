<script setup>
import { RouterView } from "vue-router";
import HomeView from "./views/HomeView.vue";
// import NavBar from "./components/NavBar.vue";

import { ref } from "vue";
// const helloText = ref("")
// function onHelloText(response) {

//   helloText.value = response;
// }
</script>

<template>
  <!-- <NavBar @on-hello-text="onHelloText" /> -->

  <HomeView/>
  <!-- <div class="mt-5">
    <RouterView />
  </div> -->
</template>

<style>
@import "tailwindcss";
</style>
