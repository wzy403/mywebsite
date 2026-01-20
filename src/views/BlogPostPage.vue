<template>
  <div class="blog-post-page">
    <NavBar />

    <main class="post-main">
      <article class="post-article">
        <!-- 文章头部 -->
        <header class="post-header">
          <h1 class="post-title">{{ post.title }}</h1>
          <div class="post-meta">
            <time class="post-date">{{ formatDate(post.date) }}</time>
          </div>
        </header>

        <!-- 文章内容 -->
        <div class="post-content prose" v-html="postContent"></div>

        <!-- 文章结尾 -->
        <footer class="post-footer">
          <div class="end-mark">完</div>
          <div class="post-info">
            <p class="author">Author: Zhengyu Wang</p>
            <p class="copyright">Copyright © {{ copyRightYear }}</p>
          </div>
        </footer>
      </article>
    </main>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

export default {
  name: "BlogPostPage",
  components: {
    NavBar,
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
    this.$nextTick(() => {
      this.highlightCode();
    });
    window.scrollTo(0, 0);
  },
  async created() {
    try {
      const postID = this.$route.params.id;
      const markdownContent = this.getPost(postID);
      const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return `<pre class="code-block"><div class="code-header"><span class="code-lang">${lang}</span></div><code class="hljs language-${lang}">${hljs.highlight(str, { language: lang }).value}</code></pre>`;
            } catch (_e) {
              // highlight failed, fallback to default
            }
          }
          return `<pre class="code-block"><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`;
        }
      });
      this.postContent = md.render(markdownContent);
    } catch (error) {
      this.$router.push(`/notfound`);
    }
  },
  methods: {
    highlightCode() {
      document.querySelectorAll('pre code.hljs').forEach((block) => {
        hljs.highlightElement(block);
      });
    },
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
        const fileInfo = file.match(regex);
        if (fileInfo && fileInfo[1] === postID) {
          this.post.title = fileInfo[2];
          this.post.date = fileInfo[3];
          let content = fileInfo[5];
          document.title = `${this.post.title} - Zhengyu Wang's Blog`;

          const imgRegex = /!\[([^\]]+)\]\(([^)]+)\)/g;
          if (!imgRegex.test(content)) {
            return content;
          }

          content = content.replace(imgRegex, (whole, alt, src) => {
            const localPath = src.match(/blogImg\/(.+)/);
            if (!localPath || !localPath[1]) {
              return whole;
            }
            const imagePath = require(`@/assets/blog/blogImg/${localPath[1]}`);
            return `![${alt}](${imagePath})`;
          });

          return content;
        }
      }
      throw new Error('Post not found');
    },
    formatDate(date) {
      if (!date) return '';
      const options = { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" };
      return new Date(date).toLocaleDateString("en-US", options);
    },
  },
};
</script>

<style>
.blog-post-page {
  min-height: 100vh;
}

.post-main {
  padding-top: calc(60px + var(--spacing-8));
  padding-bottom: var(--spacing-12);
}

.post-article {
  max-width: var(--container-prose);
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

/* 文章头部 */
.post-header {
  text-align: center;
  margin-bottom: var(--spacing-10);
  padding-bottom: var(--spacing-6);
  border-bottom: 1px solid var(--border-color);
}

.post-title {
  margin: 0 0 var(--spacing-4) 0;
  font-size: var(--text-3xl);
  font-weight: 600;
  color: var(--text-primary);
  line-height: var(--leading-tight);
}

.post-meta {
  color: var(--text-tertiary);
  font-size: var(--text-sm);
}

/* 文章内容覆盖 */
.post-content {
  color: var(--text-primary);
}

.post-content h1,
.post-content h2,
.post-content h3,
.post-content h4,
.post-content h5,
.post-content h6 {
  color: var(--text-primary);
  margin-top: var(--spacing-8);
  margin-bottom: var(--spacing-4);
}

.post-content p {
  margin-bottom: var(--spacing-4);
  line-height: var(--leading-relaxed);
}

.post-content a {
  color: var(--link-color);
  text-decoration: underline;
  text-decoration-color: var(--border-color);
  text-underline-offset: 2px;
}

.post-content a:hover {
  color: var(--accent-primary);
  text-decoration-color: var(--accent-primary);
}

/* 引用块 - 竹纹风格 */
.post-content blockquote {
  margin: var(--spacing-6) 0;
  padding: var(--spacing-4) var(--spacing-6);
  border-left: 3px solid var(--accent-tertiary);
  background: var(--bg-secondary);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  color: var(--text-secondary);
  font-style: italic;
}

.post-content blockquote p:last-child {
  margin-bottom: 0;
}

/* 代码块样式 */
.post-content .code-block {
  margin: var(--spacing-6) 0;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--bg-tertiary);
}

.post-content .code-header {
  display: flex;
  align-items: center;
  padding: var(--spacing-2) var(--spacing-4);
  background: var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.post-content .code-lang {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.post-content pre code {
  display: block;
  padding: var(--spacing-4);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  overflow-x: auto;
}

/* 行内代码 */
.post-content code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background: var(--bg-tertiary);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  color: var(--accent-primary);
}

.post-content pre code {
  background: transparent;
  padding: 0;
  color: inherit;
}

/* 图片 */
.post-content img {
  display: block;
  margin: var(--spacing-6) auto;
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

/* 列表 */
.post-content ul,
.post-content ol {
  margin: var(--spacing-4) 0;
  padding-left: var(--spacing-6);
}

.post-content ul {
  list-style-type: disc;
}

.post-content ol {
  list-style-type: decimal;
}

.post-content li {
  margin-bottom: var(--spacing-2);
}

.post-content li::marker {
  color: var(--accent-primary);
}

/* 分割线 */
.post-content hr {
  margin: var(--spacing-8) 0;
  border: none;
  height: 1px;
  background: var(--border-color);
}

/* 文章结尾 */
.post-footer {
  margin-top: var(--spacing-12);
  padding-top: var(--spacing-8);
  border-top: 1px solid var(--border-color);
}

.end-mark {
  text-align: center;
  margin-bottom: var(--spacing-6);
  font-family: var(--font-cursive);
  font-size: var(--text-lg);
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.end-mark::before,
.end-mark::after {
  content: '';
  width: 60px;
  height: 1px;
  background: var(--border-color);
  margin: 0 var(--spacing-4);
}

.post-info {
  text-align: left;
  color: var(--text-tertiary);
  font-size: var(--text-sm);
}

.post-info p {
  margin: var(--spacing-1) 0;
}

/* Highlight.js 主题覆盖 */
.hljs {
  background: transparent !important;
}

/* 响应式 */
@media (max-width: 768px) {
  .post-main {
    padding-top: calc(56px + var(--spacing-6));
  }

  .post-title {
    font-size: var(--text-2xl);
  }

  .post-content pre code {
    font-size: var(--text-xs);
  }
}

@media (max-width: 480px) {
  .post-article {
    padding: 0 var(--spacing-3);
  }

  .post-title {
    font-size: var(--text-xl);
  }

  .end-mark::before,
  .end-mark::after {
    width: 40px;
  }
}
</style>
