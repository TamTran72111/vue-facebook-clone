<template>
  <div class="container mt-3">
    <Navbar />
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: { Navbar },
};
</script>

