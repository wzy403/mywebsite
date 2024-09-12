<template>
  <a href="http://www.github.com/wzy403" target="_blank" rel="noopener noreferrer">
    <img class="github" src="@/assets/img/github-mark-white.svg" alt="github" width="50" height="50" />
  </a>
  <div class="home">
    <div class="info">
      <a href="https://github.com/wzy403" target="_blank" style="margin: 0;">
        <img
          class="avatar"
          src="https://avatars.githubusercontent.com/u/95310061?v=4"
          alt="avatar"
          width="100"
          height="100"
        />
      </a>
      <h1 class="name">{{ this.name }}</h1>
      <h2 class="slogen">{{ this.slogen }}</h2>
    </div>

    <div class="hub">
      <div class="blog" @click="showPage('blog')">
        <img src="@/assets/img/blog.svg" alt="blog" width="50" height="50" />
        <div><span>Blog</span></div>
      </div>
      <div class="project" @click="showPage('project')">
        <img
          src="@/assets/img/project.svg"
          alt="project"
          width="50"
          height="50"
        />
        <div><span>Project</span></div>
      </div>
      <!-- <div class="notes" @click="showPage('blog')">
        <img src="@/assets/img/notes.svg" alt="notes" width="50" height="50" />
        <div><span class="notesspan">Notes</span></div>
      </div> -->
      <div class="about" @click="showPage('about')">
        <img src="@/assets/img/about.svg" alt="about" width="50" height="50" />
        <div><span>About</span></div>
      </div>
      <div class="cv" @click="showPage('cv')">
        <img src="@/assets/img/cv.svg" alt="cv" width="50" height="50" />
        <div><span class="cvspan">CV</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  components: {},
  data() {
    return {
      name: "Zhengyu (Joey) Wang",
      slogen: "正因为是废物，所以才要比任何人都努力的活着",
    };
  },
  methods: {
    showPage(pagename) {
      if(pagename === "cv"){
        window.open("/Zhengyu_Wang_Resume.pdf", "_blank");
        return;
      }
      this.$router.push({ path: `/${pagename}` });
    },
  },
};
</script>

<style scoped>
.home {
  font-family: "Comic Sans MS", "Helvetica Neue", "Microsoft Yahei",
    "-apple-system", "sans-serif";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffff;
  margin-top: 25vh;
  flex-direction: column;
  justify-content: flex-start;
  vertical-align: middle;
}

.github{
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  transform: rotate(45deg);
  transition: filter 0.5s ease, transform 0.3s ease;
}

.github:hover {
  filter: brightness(1.5) drop-shadow(0 0 10px #fff);
  transform: rotate(45deg);
}

.avatar {
  border-radius: 100px;
  border-style: solid;
  border-width: 2px;
  border-color: #808184;
  background-size: cover;
  box-shadow: 0px 0px 40px #808184;
  opacity: 1;
  transition: all 1s ease;
}

.avatar:hover {
  box-shadow: 0 0 10px #fff;
  -webkit-box-shadow: 0 0 19px #fff;
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

.hub div {
  margin: 10px;
  transition: filter 0.3s ease, transform 0.3s ease;
}
.hub div:hover {
  filter: brightness(1.5) drop-shadow(0 0 10px #fff);
  transform: scale(1.1);
}

.cvspan {
  padding-right: 8px;
}

.notesspan {
  padding-right: 4px;
}
</style>
