<template>
  <div>
    <NavBarVue />
    <div class="BlogPostPage">
      <div class="main">
        <div class="title-bar">
          <h1 class="title">{{ post.title }}</h1>
          <span class="title">{{ formatDate(post.date) }}</span>
        </div>
        <div class="container">
          <div class="content" v-html="postContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarVue from "@/components/NavBar.vue";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/rainbow.css";
// import 'highlight.js/styles/obsidian.css';
// import 'highlight.js/styles/gradient-dark.css';
// import 'highlight.js/styles/gradient-light.css';
// import 'highlight.js/styles/agate.css';
window.hljs = hljs;
require("highlightjs-line-numbers.js");

export default {
  name: "BlogPostPage",
  components: {
    NavBarVue,
  },
  data() {
    return {
      post: {
        title: "",
        date: "",
      },
      postContent: "",
    };
  },
  mounted() {
    hljs.highlightAll(); // highlight your code on mount
    hljs.initLineNumbersOnLoad();
  },
  async created() {
    try {
      const postID = this.$route.params.id;
      const markdownContent = this.getPost(postID);
      this.postContent = marked(markdownContent);
    } catch (error) {
      // console.error("Failed to load post:", error);
      this.$router.push(`/notfound`);
    }
  },
  methods: {
    getAllFileName() {
      const requireContext = require.context("@/assets/blog", false, /\.md$/);
      const fileNames = requireContext
        .keys()
        .map((file) => file.replace("./", ""));
      return fileNames;
    },
    getPost(postID) {
      const fileNames = this.getAllFileName();
      for (let name of fileNames) {
        const file = require(`@/assets/blog/${name}`).default;
        const regex =
          /^---\s*id:\s*(\d+)\s*title:\s*(.+)\s*date:\s*([\d-]+)\s*---\s*([\s\S]*)/;
        // const regex = /^---\s*id:\s*(\d+)\s*title:\s*(.+)\s*date:\s*([\d-]+)\s*---/;
        const match = file.match(regex);
        if (match && match[1] === postID) {
          this.post.title = match[2];
          this.post.date = match[3];
          return match[4];
        }
        this.$$router.push(`/notfound`);
      }
    },
    formatDate(date) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    },
  },
};
</script>

<style>
.BlogPostPage {
  background: none;
  height: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  width: 80%;
}
.main{
  position: relative;

  padding-left: 1rem;
  padding-right: 3rem;
  margin-left: auto;
  margin-right: auto;
  
  left: 9%;
  background-color: #fff;
  width: 100%;
  min-height: 100%; /* 使用min-height而不是height */
  box-shadow: 0 0 20px #b9b1b1;
  overflow: auto; /* 允许滚动 */
}
.title-bar {
  text-align: center;
}
.content {
  position: relative;

  padding-left: 1rem;
  padding-right: 3rem;
  margin-left: auto;
  margin-right: auto;
}
.hljs-ln .hljs-ln-code {
  padding-left: 10px;
}
.hljs-ln .hljs-ln-numbers {
  text-align: center;
  color: #ccc;
  border-right: 1px solid #999;
  vertical-align: top;
  padding-right: 5px;
}
.content code {
  font-family: "Consolas", "Fira Code", monospace;
  white-space: pre;
}
blockquote {
  background: rgb(249, 249, 249);
  border-left: 5px solid rgb(204, 204, 204);
  padding: 15px 20px;
  margin: 20px 0px;
}
code {
  font-size: 0.85em;
  font-family: Consolas, "Bitstream Vera Sans Mono", "Courier New", Courier,
    monospace;
  line-height: 1.2em;
  word-break: normal;
  background: rgb(242, 239, 230);
  padding: 0.2em 0.3em;
  border-radius: 5px;
  color: rgb(245, 81, 81);
}
img {
  vertical-align: middle;
  border-style: none;
}

@media (max-width: 768px) {
  .BlogPostPage{
    transform: scale(0.9);
    transform-origin: top center;
  }
}
</style>
