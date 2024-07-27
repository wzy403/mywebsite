<template>
  <a href="http://www.github.com/wzy403" target="_blank" rel="noopener noreferrer">
    <img class="github" src="@/assets/img/github-mark-white.svg" alt="github" width="50" height="50" />
  </a>
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

.github{
  position: absolute;
  top: 0;
  right: 0;
  margin: 5px;
  transform: rotate(45deg);
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
