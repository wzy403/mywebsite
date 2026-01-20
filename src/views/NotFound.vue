<template>
  <div class="not-found">
    <div class="not-found-content">
      <!-- Enso Circle -->
      <div class="enso-circle" aria-hidden="true">
        <svg viewBox="0 0 200 200" class="enso-svg">
          <path
            d="M100,20 C150,20 180,50 180,100 C180,150 150,180 100,180 C50,180 20,150 20,100 C20,50 50,20 100,20"
            fill="none"
            stroke="currentColor"
            stroke-width="8"
            stroke-linecap="round"
            stroke-dasharray="440"
            stroke-dashoffset="40"
          />
        </svg>
      </div>

      <!-- 404 Number -->
      <h1 class="error-code">404</h1>

      <!-- Haiku Style Message -->
      <div class="error-message">
        <p class="haiku-line">此路不通处</p>
        <p class="haiku-line">迷途知返亦是道</p>
        <p class="haiku-line">归去来兮</p>
      </div>

      <p class="error-hint">
        The page you are looking for seems to have wandered off...
      </p>

      <!-- Home Link -->
      <router-link to="/" class="home-link">
        <span class="link-text">Return Home</span>
        <span class="link-arrow">&rarr;</span>
      </router-link>
    </div>

    <!-- Wave Decoration -->
    <div class="wave-decoration" aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  name: "NotFound",
  setup() {
    onMounted(() => {
      document.title = '404 - Page Not Found';
    });

    return {};
  },
};
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--bg-primary);
  color: var(--text-primary);
  position: relative;
  overflow: hidden;
  padding: var(--spacing-8);
}

.not-found-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

/* Enso Circle */
.enso-circle {
  width: 150px;
  height: 150px;
  margin: 0 auto var(--spacing-6);
  color: var(--accent-primary);
  opacity: 0.6;
}

.enso-svg {
  width: 100%;
  height: 100%;
  animation: drawEnso 2s ease-out forwards;
}

@keyframes drawEnso {
  from {
    stroke-dashoffset: 480;
    opacity: 0;
  }
  to {
    stroke-dashoffset: 40;
    opacity: 1;
  }
}

/* 404 Number */
.error-code {
  font-family: var(--font-serif);
  font-size: 120px;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-6);
  line-height: 1;
  opacity: 0.9;
}

/* Haiku Style Message */
.error-message {
  margin-bottom: var(--spacing-6);
  padding: var(--spacing-4) 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.haiku-line {
  font-family: var(--font-cursive);
  font-size: var(--text-lg);
  color: var(--text-secondary);
  margin: var(--spacing-2) 0;
  letter-spacing: 0.2em;
}

.error-hint {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  margin-bottom: var(--spacing-8);
  font-style: italic;
}

/* Home Link */
.home-link {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-3) var(--spacing-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  color: var(--text-primary);
  text-decoration: none;
  font-size: var(--text-base);
  transition: all var(--transition-normal);
}

.home-link:hover {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: var(--bg-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.home-link:hover .link-arrow {
  transform: translateX(4px);
}

.link-arrow {
  margin-left: var(--spacing-2);
  transition: transform var(--transition-fast);
}

/* Wave Decoration */
.wave-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  color: var(--bg-secondary);
  opacity: 0.5;
}

.wave-decoration svg {
  width: 100%;
  height: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .enso-circle {
    width: 100px;
    height: 100px;
  }

  .error-code {
    font-size: 80px;
  }

  .haiku-line {
    font-size: var(--text-base);
  }
}

@media (max-width: 480px) {
  .not-found {
    padding: var(--spacing-4);
  }

  .error-code {
    font-size: 60px;
  }

  .haiku-line {
    font-size: var(--text-sm);
    letter-spacing: 0.1em;
  }

  .home-link {
    padding: var(--spacing-2) var(--spacing-4);
    font-size: var(--text-sm);
  }
}
</style>
