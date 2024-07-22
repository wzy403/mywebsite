<template>
  <div id="'app'">
    <div class="info">
      <img
        class="avatar"
        src="https://avatars.githubusercontent.com/u/95310061?v=4"
        alt="avatar"
        width="100"
        height="100"
      />
      <h1 class="name">{{ this.name }}</h1>
      <h2 class="slogen">{{ this.slogen }}</h2>
    </div>

    <div class="hub">
      <div class="blog">
        <img src="./assets/blog.svg" alt="blog" width="50" height="50" />
        <div><span>Blog</span></div>
      </div>
      <div class="project">
        <img src="./assets/project.svg" alt="project" width="50" height="50" />
        <div><span>Project</span></div>
      </div>
      <div class="about">
        <img src="./assets/about.svg" alt="about" width="50" height="50" />
        <div><span>About</span></div>
      </div>
      <div class="cv">
        <img src="./assets/cv.svg" alt="cv" width="50" height="50" />
        <div><span class="cvspan">CV</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      name: "Zhengyu (Joey) Wang",
      slogen: "正因为是废物，所以才要比任何人都要努力活着",
    };
  },
};
</script>

<style>
body {
  background-color: #242424;
}

#app {
  font-family: "Comic Sans MS", "Helvetica Neue", "Microsoft Yahei",
    "-apple-system", "sans-serif";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffff;
  margin-top: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  vertical-align: middle;
  /* justify-content: center; */
}

.avatar {
  border-radius: 100px;
  border-style: solid;
  border-width: 2px;
  border-color: #4b4a4a;
}

.name {
  color: #ffff;
  font-size: 2rem;
  font-weight: 300;
}

.slogen {
  font-family: "Ma Shan Zheng", "PingFang SC", "Microsoft YaHei", "STHeiti",
    "Tahoma";
  font-weight: 100;
}

.hub {
  margin-top: 3vh;
  display: inline-flex;
  justify-content: center;
  flex-wrap: wrap;
  border-top: 1px solid hsla(0, 0%, 100%, 0.1);
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  padding-top: 20px;
  padding-bottom: 20px;
}

.hub div{
  margin: 10px;
}

.cvspan{
  padding-right: 8px;
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
