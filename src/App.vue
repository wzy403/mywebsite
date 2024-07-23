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
body {
  background-color: #242424;
  margin: 0;
  overflow: hidden;
}
#app {
  font-family: "Comic Sans MS", "Helvetica Neue", "Microsoft Yahei",
    "-apple-system", "sans-serif";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffff;
  /* margin-top: 25vh; */
  /* display: flex; */
  flex-direction: column;
  justify-content: flex-start;
  vertical-align: middle;
}

/* 设置浏览器滚动条样式 */
/* 浏览器滚动条样式 */
/* width */
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f3f3f3;
  border-radius: 8px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(201, 201, 202, 0.5);
  border-radius: 8px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  /* background: rgb(162, 162, 163); */
  background: rgba(201, 201, 202, 0.5);
  border-radius: 8px;
}
</style>
