<template>
  <NavBarVue />
  <div class="blog-page">
    <h1 class="title">Blog</h1>
    <div class="blog-container">
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
    this.postsYear.sort().reverse();
    for(let year of this.postsYear){
      this.postsObject[year].sort((a, b) => {
        if(a.date > b.date){
          return -1;
        }
        if(a.dataInfo < b.date){
          return 1;
        }
        return 0;
      });
    }
    console.log("seccuss fetch the blog");
  },
  methods: {
    showPost(id) {
      this.$router.push({ path: `/blog/${id}` });
    },
    formatDate(date) {
      const options = { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" };
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
        
        const regex = /^---\s*id:\s*(\d+)\s*title:\s*(.+)\s*date:\s*([\d-]+)\s*tags:\s*([\s\S]+?)\s*---/m;
        
        const info = file.match(regex);
        if (info && info.length == 5) {
          
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
        }else{
          console.log("unseccuss get file below");
          console.log(info[0]);
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

.blog-container {
  position: relative;
  background-color: #fff;
  color: #000;
  margin: 0 auto;
  width: 75vw;
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
  flex-direction: row; 
  justify-content: flex-start;
}

.post-date {
  color: #000;
  margin-right: 20px;
  min-width: 100px;
  text-align: right;
}

.title {
  text-align: center;
}

@media (max-width: 768px) {

  .blog-list {
    padding: 20px;
    margin-left: 0;
  }

  .blog-post {
    margin: 10px 0;
    width: 100%;
  }

  .post-date {
    font-size: 0.9em;
  }
}

@media (max-width: 431px) {

  /* .blog-list {
    padding: 15px;
    margin-left: 0;
  } */
  
  .blog-container{
    width: 100%;
  }

  .blog-post {
    flex-direction: column;

  }
  .blog-link{
    width: 90%;
  }

  .post-date {
    font-size: 0.8em;
  }
}
</style>
