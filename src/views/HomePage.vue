<template>
  <div class="home-page">
    <!-- 粒子背景 (可选) -->
    <div class="particles-container" aria-hidden="true">
      <span v-for="n in 20" :key="n" class="particle" :style="particleStyle(n)"></span>
    </div>

    <div class="home-content">
      <!-- 头像区域 -->
      <div class="avatar-section">
        <a
          href="https://github.com/wzy403"
          target="_blank"
          rel="noopener noreferrer"
          class="avatar-link"
        >
          <img
            class="avatar"
            src="https://avatars.githubusercontent.com/u/95310061?v=4"
            alt="Zhengyu Wang's avatar"
            width="120"
            height="120"
          />
        </a>
      </div>

      <!-- 信息区域 -->
      <div class="info-section">
        <h1 class="name">Zhengyu Wang</h1>
        <p class="slogan">正因为是废物，所以才要比任何人都努力的活着</p>
      </div>

      <!-- 导航中枢 -->
      <nav class="hub-section">
        <div class="hub-item" @click="navigateTo('blog')">
          <div class="hub-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
          </div>
          <span class="hub-label">Blog</span>
        </div>

        <div class="hub-item" @click="navigateTo('project')">
          <div class="hub-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <span class="hub-label">Projects</span>
        </div>

        <div class="hub-item" @click="navigateTo('about')">
          <div class="hub-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <span class="hub-label">About</span>
        </div>

        <div class="hub-item" @click="openCV">
          <div class="hub-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <span class="hub-label">CV</span>
        </div>
      </nav>

      <!-- 底部区域 -->
      <footer class="home-footer">
        <div class="footer-content">
          <span class="copyright">© 2026 Zhengyu Wang</span>
          <span class="divider">·</span>
          <ThemeToggle />
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import ThemeToggle from '@/components/ThemeToggle.vue';

export default {
  name: "HomePage",
  components: {
    ThemeToggle
  },
  setup() {
    const router = useRouter();

    const navigateTo = (path) => {
      router.push(`/${path}`);
    };

    const openCV = () => {
      window.open("/Zhengyu_Wang_Resume.pdf", "_blank");
    };

    // 生成随机粒子样式
    // eslint-disable-next-line no-unused-vars
    const particleStyle = (n) => {
      const left = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = 15 + Math.random() * 10;
      const size = 4 + Math.random() * 8;

      return {
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        width: `${size}px`,
        height: `${size}px`
      };
    };

    return {
      navigateTo,
      openCV,
      particleStyle
    };
  }
};
</script>

<style scoped>
.home-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* 粒子背景 */
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  top: -20px;
  background: var(--accent-secondary);
  border-radius: 50%;
  opacity: 0.3;
  animation: particleFall linear infinite;
}

@keyframes particleFall {
  0% {
    transform: translateY(-10vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.3;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(110vh) rotate(360deg);
    opacity: 0;
  }
}

/* 主要内容 */
.home-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-6);
  text-align: center;
}

/* 头像区域 */
.avatar-section {
  margin-bottom: var(--spacing-6);
}

.avatar-link {
  display: block;
  text-decoration: none;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid var(--border-color);
  box-shadow: 0 0 30px var(--shadow-color);
  transition: all 0.4s ease;
  object-fit: cover;
}

.avatar:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px var(--shadow-color),
              0 0 0 4px var(--accent-secondary);
}

/* 信息区域 */
.info-section {
  margin-bottom: var(--spacing-8);
}

.name {
  margin: 0 0 var(--spacing-3) 0;
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.slogan {
  margin: 0;
  font-family: var(--font-cursive);
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 400px;
  line-height: var(--leading-relaxed);
}

/* 导航中枢 */
.hub-section {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: calc(var(--spacing-2) * -1);
  padding: var(--spacing-6) 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.hub-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: var(--spacing-2);
  padding: var(--spacing-4);
  min-width: 80px;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s ease;
}

.hub-item:hover {
  background: var(--bg-secondary);
}

.hub-item:hover .hub-icon {
  transform: translateY(-2px);
  color: var(--accent-primary);
}

.hub-icon {
  width: 40px;
  height: 40px;
  margin-bottom: var(--spacing-2);
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.hub-icon svg {
  width: 100%;
  height: 100%;
}

.hub-label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
}

/* 底部区域 */
.home-footer {
  margin-top: var(--spacing-8);
}

.footer-content {
  display: flex;
  align-items: center;
  color: var(--text-tertiary);
  font-size: var(--text-sm);
}

.copyright {
  /* 版权文字 */
}

.divider {
  margin: 0 var(--spacing-3);
}

/* 响应式 */
@media (max-width: 768px) {
  .avatar {
    width: 100px;
    height: 100px;
  }

  .name {
    font-size: var(--text-xl);
  }

  .slogan {
    font-size: var(--text-base);
    max-width: 300px;
  }

  .hub-item {
    padding: var(--spacing-3);
    min-width: 70px;
  }

  .hub-icon {
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 480px) {
  .home-content {
    padding: var(--spacing-4);
  }

  .hub-section {
    padding: var(--spacing-4) 0;
  }

  .hub-item {
    min-width: 60px;
    padding: var(--spacing-2);
  }

  .hub-label {
    font-size: var(--text-xs);
  }

  .footer-content {
    flex-direction: column;
  }

  .footer-content .divider {
    display: none;
  }

  .copyright {
    margin-bottom: var(--spacing-2);
  }
}
</style>
