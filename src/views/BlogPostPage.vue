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

        <div class="footer">
          <div class="finish">
            <span class="finish-word">完</span>
          </div>
          <div class="info">
            <div class="author">
              <span>Author: Zhengyu Wang</span>
            </div>
            <div class="copy-right">
              <span>Copyright © {{ this.copyRightYear }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarVue from "@/components/NavBar.vue";
import MarkdownIt from "markdown-it";
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
      copyRightYear: 2026,
    };
  },
  mounted() {
    hljs.highlightAll(); // highlight code on mount
    hljs.initLineNumbersOnLoad();
    // hljs.initHighlightingOnLoad();
    var blocks = document.querySelectorAll('pre');
    Array.prototype.forEach.call(blocks, function(block) {
      var language = block.querySelector('code.hljs').result.language;
      block.insertAdjacentHTML("afterbegin",`<label class="code-language-tag">${language}</label>`)
    });
    window.scrollTo(0,0);
  },
  async created() {
    try {
      const postID = this.$route.params.id;
      const markdownContent = this.getPost(postID);
      const md = new MarkdownIt({
        html: true, // 启用 HTML 标签解析
        linkify: true, // 自动识别 URL 并转换为链接
        typographer: true // 启用智能排版
      });
      this.postContent = md.render(markdownContent);
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
          /^---\s*id:\s*(\d+)\s*title:\s*(.+)\s*date:\s*([\d-]+)\s*tags:\s*([\s\S]+?)\s*---\s*([\s\S]*)/m;
        // const regex = /^---\s*id:\s*(\d+)\s*title:\s*(.+)\s*date:\s*([\d-]+)\s*---/;
        const fileInfo = file.match(regex);
        if (fileInfo && fileInfo[1] === postID) {
          this.post.title = fileInfo[2];
          this.post.date = fileInfo[3];
          let content = fileInfo[5];
          document.title = `${this.post.title} - Zhengyu Wang's Blog`;
          const imgRegex = /!\[([^\]]+)\]\(([^)]+)\)/g;
          if(!imgRegex.test(content)){
            return content;
          }

          content = content.replace(imgRegex, (whole, alt, src) => {
            const localPath = src.match(/blogImg\/(.+)/);

            if(!localPath || !localPath[1]){
              return whole;
            }
            const imagePath = require(`@/assets/blog/blogImg/${localPath[1]}`);
            // console.log("Image Path:", imagePath);
            return `![${alt}](${imagePath})`;
          });
          
          // console.log("Updated Content:", content);
          return content;
        }
      }
      this.$$router.push(`/notfound`);
    },
    formatDate(date) {
      const options = { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" };
      return new Date(date).toLocaleDateString("en-US", options);
    },
  },
};
</script>

<style>
.BlogPostPage {
  position: relative;
  background: none;
  height: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  /* right: 1.1vh; */
  /* width: 80%; */
  font-size: 18px;
  margin: 0 auto;
  /* width: 75vw; */
  width: 80vw;
}
.main{
  /* position: relative; */

  padding-left: 30px;
  padding-right: 50px;
  margin-left: auto;
  margin-right: auto;
  
  /* left: 10%; */
  background-color: #fff;
  /* width: 100%; */
  /* min-height: 100%; */
  box-shadow: 0 0 20px #b9b1b1;
  overflow: auto;
}

.title-bar {
  text-align: center;
}
.content {
  position: relative;

  padding-left: 1rem;

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
  /* vertical-align: top; */
  padding-right: 5px;
  word-break: normal;
}

pre .code-language-tag{
  position: relative;
  top: 0;
  left: 0;
  /* padding: 0.1em 0.5em; */
  padding: 3px 8px;
  background: #474949;
  color: #fff;
  /* border: 2px solid #474949; */
  border-radius: 5px 5px 0 0;
  font-size: 0.9em;
}

blockquote {
  background: rgb(249, 249, 249);
  border-left: 5px solid rgb(204, 204, 204);
  padding: 15px 20px;
  margin: 20px 0px;
}

code {
  font-size: 0.85em;
  font-family: "Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier,
    monospace;
  line-height: 1.2em;
  /* white-space: normal; */
  /* word-break: break-all; */
  overflow-wrap: break-word;
  background: rgb(242, 239, 230);
  padding: 0.2em 0.3em;
  border-radius: 5px;
  color: rgb(245, 81, 81);
}

.content code {
  font-size: 0.85em;
  font-family: "Consolas", monospace;
  line-height: 1.2em;
  /* word-break: normal; */
  padding: 0.2em 0.3em;
  border-radius: 0 5px 5px 5px;
  overflow-x: auto;
}

.content img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
  transform: none;
  transform-origin: center;
}

.footer {
  padding: 1rem 2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 0.9em;
}

.footer .finish {
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
}

.footer .finish::before,
.footer .finish::after {
  content: '';
  flex-grow: 1;
  height: 1px;
  background: rgb(94, 94, 94, 0.3);
  margin: 0 10px;
}

.finish-word {
  -webkit-tap-highlight-color: transparent;
  font-family: "Liu Jian Mao Cao", cursive;
  font-size: 18px;
  line-height: 1.7;
  color: rgb(89, 89, 89, 0.8);
}

.footer .info{
  text-align: left;
  margin-top: 1em;
}

@media (max-width: 768px) {
  .BlogPostPage{
    transform: scale(0.9);
    transform-origin: top center;
  }
}

@media (max-width: 431px) {
  .BlogPostPage{
    /* transform: scale(0.9);
    transform-origin: top center; */
    height: 100vh;
    width: 111vw;
    right: 5.5vw;
  }
  .main{
    padding-left: 10px;
    padding-right: 20px;
  }
}
</style>
