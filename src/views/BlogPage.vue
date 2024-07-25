<!-- src/views/BlogPage.vue -->
<template>
  <NavBarVue />
  <div class="blog-page">
    <h1 class="title">Blog</h1>
    <div class="blog-continer">
      <div class="blog-list">
        <div v-for="year in postsYear" :key="year">
          <h1>{{ year }}</h1>
          <div v-for="post in postsObject[year]" :key="post.id" class="blog-post">
            <div class="post-date">{{ formatDate(post.date) }}</div>
            <PostCardVue
              class="blog-link"
              :post="post"
              @click="showPost(post.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import NavBarVue from "@/components/NavBar.vue";
import PostCardVue from "@/components/PostCard.vue";

export default {
  name: "BlogPage",
  components: {
    NavBarVue,
    PostCardVue,
  },
  data() {
    return {
      postsObject: {
        "9999": [
          {
            id: 1,
            title: "No blog post right know",
            date: "9999-12-31",
          },
        ],
        "9899": [
          {
            id: 2,
            title: "No blog post right know",
            date: "9999-12-31",
          },
        ],
      },
      postsYear: ["9999","9899"],
    };
  },
  created() {
    this.initBlogList();
    this.postsYear.sort();
    console.log("seccuss fetch the blog");
  },
  methods: {
    showPost(id) {
      this.$router.push({ path: `/blog/${id}` });
    },
    formatDate(date) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    },
    getAllFileName() {
      const requireContext = require.context("@/assets/blog", false, /\.md$/);
      const fileNames = requireContext
        .keys()
        .map((file) => file.replace("./", ""));
      return fileNames;
    },
    initBlogList() {
      const fileNames = this.getAllFileName();
      if (fileNames.length === 0) {
        return;
      }
      let blogList = {};
      let blogYear = [];

      for (let name of fileNames) {
        const file = require(`@/assets/blog/${name}`).default;
        // const regex = /^---\s*id:\s*(\d+)\s*title:\s*(.+)\s*date:\s*([\d-]+)\s*---\s*([\s\S]*)/;
        
        const regex = /^---\s*id:\s*(\d+)\s*title:\s*(.+)\s*date:\s*([\d-]+)\s*---/;
        
        const info = file.match(regex);
        if (info && info.length == 4) {
          // let content = match[4];
          const getYearRegex = /(\d{4})-\d{2}-\d{2}/;
          const dataInfo = info[3].match(getYearRegex);
          const year = dataInfo[1];
          
          if(!blogYear.includes(year)){
            blogList[year] = [];
            blogYear.push(year);
          }
          blogList[year].push({
            id: info[1],
            title: info[2],
            date: info[3],
          });
        }
      }
      if(blogYear){
        this.postsObject = blogList;
        this.postsYear = blogYear;
      }
    },
  },
};
</script>

<style scoped>
.blog-page {
  color: white;
  background: none;
  padding: 2rem 0;
  width: 100%;
  height: 100%;
}

.blog-continer {
  position: relative;
  background-color: #fff;
  color: #000;
  margin: 0 auto;
  width: 80%;
  min-height: 77vh;
  box-shadow: 0 0 20px #b9b1b1;
}

.blog-list {
  /* width: 100%; */
  padding: 50px;
  margin-left: 10px;
}

.blog-post {
  display: flex;
  width: 90%;
  margin: 13px 2em;
  align-items: center;
  color: rgb(89, 89, 89);
}

.post-date {
  color: #000;
  margin-right: 20px;
}

.title {
  text-align: center;
}
</style>
