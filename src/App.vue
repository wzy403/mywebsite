<template>
  <div id="'app'">
    <NavBar class="navbar"/>
    <div class="content">
      <div class="inner">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

import NavBar from "./components/NavBar.vue";

export default {
  name: 'App',
  components: {
    NavBar,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.navbar{
  margin-left: 0px;
  padding-left: 9%;
}

.content{
  background-color: white;
  width: 80%;
  min-height: 545px;
  margin: 2% 10%;
  flex-grow: 1;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
}

.content .inner{
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 50px;
  padding-right: 50px;
}

body{
  background-color: #f3f3f3;
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
    background: rgba(201, 201, 202, .5);
    border-radius: 8px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    /* background: rgb(162, 162, 163); */
    background: rgba(201, 201, 202, .5);
    border-radius: 8px;
}

</style>
