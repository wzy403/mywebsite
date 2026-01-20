<template>
  <div class="blog-page">
    <NavBar />

    <main class="blog-main">
      <header class="blog-header">
        <h1 class="page-title">Blog</h1>
        <p class="page-subtitle">笔耕不辍，记录生活与技术</p>
      </header>

      <div class="blog-container">
        <div class="blog-list">
          <section v-for="year in postsYear" :key="year" class="year-section">
            <h2 class="year-title">
              <span class="year-text">{{ year }}</span>
            </h2>
            <div class="posts-list">
              <PostCard
                v-for="post in postsObject[year]"
                :key="post.id"
                :post="post"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import PostCard from "@/components/PostCard.vue";

export default {
  name: "BlogPage",
  components: {
    NavBar,
    PostCard,
  },
  data() {
    return {
      postsObject: {},
      postsYear: [],
    };
  },
  created() {
    this.initBlogList();
    this.postsYear.sort().reverse();
    for (let year of this.postsYear) {
      this.postsObject[year].sort((a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
      });
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
    initBlogList() {
      const fileNames = this.getAllFileName();
      if (fileNames.length === 0) return;

      let blogList = {};
      let blogYear = [];

      for (let name of fileNames) {
        const file = require(`@/assets/blog/${name}`).default;
        const regex = /^---\s*id:\s*(\d+)\s*title:\s*(.+)\s*date:\s*([\d-]+)\s*tags:\s*([\s\S]+?)\s*---/m;
        const info = file.match(regex);

        if (info && info.length === 5) {
          const getYearRegex = /(\d{4})-\d{2}-\d{2}/;
          const dataInfo = info[3].match(getYearRegex);
          const year = dataInfo[1];

          if (!blogYear.includes(year)) {
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

      if (blogYear.length > 0) {
        this.postsObject = blogList;
        this.postsYear = blogYear;
      }
    },
  },
};
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
}

.blog-main {
  padding-top: calc(60px + var(--spacing-8));
  padding-bottom: var(--spacing-12);
}

.blog-header {
  text-align: center;
  margin-bottom: var(--spacing-8);
  padding: 0 var(--spacing-4);
}

.page-title {
  margin: 0 0 var(--spacing-2) 0;
  font-size: var(--text-3xl);
  font-weight: 600;
  color: var(--text-primary);
}

.page-subtitle {
  margin: 0;
  font-size: var(--text-base);
  color: var(--text-tertiary);
}

.blog-container {
  max-width: var(--container-md);
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

.blog-list {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
}

.year-section {
  margin-bottom: var(--spacing-8);
}

.year-section:last-child {
  margin-bottom: 0;
}

.year-title {
  display: flex;
  align-items: center;
  margin: 0 0 var(--spacing-4) 0;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.year-text {
  padding-right: var(--spacing-4);
}

.year-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-color);
}

/* 响应式 */
@media (max-width: 768px) {
  .blog-main {
    padding-top: calc(56px + var(--spacing-6));
  }

  .page-title {
    font-size: var(--text-2xl);
  }

  .blog-list {
    padding: var(--spacing-4);
    border-radius: var(--radius-lg);
  }
}

@media (max-width: 480px) {
  .blog-container {
    padding: 0 var(--spacing-2);
  }

  .blog-list {
    padding: var(--spacing-3);
    border-radius: var(--radius-md);
  }
}
</style>
