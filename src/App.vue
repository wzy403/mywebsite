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
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "PingFang SC",
    "Hiragino Sans GB",
    sans-serif; 

  /* font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "PingFang SC",
    "Hiragino Sans GB",
    "Microsoft YaHei",
    sans-serif;   */
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  /* color: #ffff; */
  /* margin-top: 25vh; */
  /* display: flex; */
  flex-direction: column;
  justify-content: flex-start;
  vertical-align: middle;
}

@media (max-width: 768px) {
  .app{
    transform: scale(0.8);
    transform-origin: top left;
  }
}
/* @media (max-width: 430px) {
  .app{
    transform: scale(0.8);
    transform-origin: top left;
  }
} */
</style>
