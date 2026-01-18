<template>
  <nav class="nav-bar" :class="{ 'nav-hidden': isHidden }">
    <div class="nav-content">
      <div class="nav-links">
        <router-link class="nav-link" to="/">Home</router-link>
        <router-link class="nav-link" to="/blog">Blog</router-link>
        <router-link class="nav-link" to="/project">Projects</router-link>
        <router-link class="nav-link" to="/about">About</router-link>
      </div>
      <ThemeToggle />
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import ThemeToggle from './ThemeToggle.vue';

export default {
  name: "NavBar",
  components: {
    ThemeToggle
  },
  setup() {
    const isHidden = ref(false);
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        isHidden.value = true;
      } else {
        isHidden.value = false;
      }

      lastScrollY = currentScrollY;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      isHidden
    };
  }
};
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--bg-primary);
  background: rgba(250, 248, 245, 0.85);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  z-index: var(--z-fixed);
  transition: transform var(--transition-normal),
              background var(--transition-normal);
}

[data-theme="dark"] .nav-bar {
  background: rgba(26, 25, 23, 0.85);
}

.nav-bar.nav-hidden {
  transform: translateY(-100%);
}

.nav-content {
  max-width: var(--container-lg);
  height: 100%;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-link {
  position: relative;
  padding: var(--spacing-2) var(--spacing-4);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: color var(--transition-fast);
}

.nav-link:hover {
  color: var(--text-primary);
}

/* 活动状态下划线 */
.nav-link.router-link-active {
  color: var(--text-primary);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: var(--accent-primary);
  border-radius: 1px;
}

/* 响应式 */
@media (max-width: 768px) {
  .nav-bar {
    height: 56px;
  }

  .nav-link {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--text-xs);
  }
}

@media (max-width: 480px) {
  .nav-link {
    padding: var(--spacing-1) var(--spacing-2);
  }
}
</style>
