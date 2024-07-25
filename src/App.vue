<template>
  <div id="'app'">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
    };
  },
};
</script>

<style>
#app {
  font-family: "Comic Sans MS", "Helvetica Neue", "Microsoft Yahei",
    "-apple-system", "sans-serif";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #ffff; */
  /* margin-top: 25vh; */
  /* display: flex; */
  flex-direction: column;
  justify-content: flex-start;
  vertical-align: middle;
}
</style>
