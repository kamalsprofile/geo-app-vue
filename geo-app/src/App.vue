<template>
  <div id="app">
    <div id="nav">
      <NavBar/>
    </div>
    <router-view/>
  </div>
</template>
<script>
import NavBar from "@/components/layout/navbar";
export default {
  name: "index",
  components: {
    NavBar
  }
};
</script>

<style>
</style>
