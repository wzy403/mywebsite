<template>
  <div
    class="project-card"
    :class="{ 'is-pressed': isPressed }"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <h3 class="project-name">{{ project.name }}</h3>
    <p class="project-description">{{ project.description }}</p>
    <div class="project-languages">
      <span
        v-for="language in project.languages"
        :key="language"
        class="language-tag"
      >
        <span
          class="language-dot"
          :style="{ backgroundColor: languageColor(language) }"
        ></span>
        <span class="language-name">{{ language }}</span>
      </span>
    </div>
    <a :href="project.url" target="_blank" rel="noopener noreferrer" class="project-link">
      <span>View on GitHub</span>
      <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
    </a>
  </div>
</template>

<script>
import colors from "@/assets/colors.json";

export default {
  name: "ProjectCard",
  props: {
    project: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isPressed: false,
    };
  },
  methods: {
    languageColor(language) {
      return colors[language] ? colors[language].color : 'var(--text-tertiary)';
    },
    onTouchStart() {
      this.isPressed = true;
    },
    onTouchEnd() {
      this.isPressed = false;
    },
  },
};
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 桌面端 hover 效果 */
@media (hover: hover) {
  .project-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--accent-primary);
  }
}

/* 移动端点击效果 */
.project-card {
  -webkit-tap-highlight-color: transparent;
}

.project-card.is-pressed {
  transform: scale(0.97);
  border-color: var(--accent-primary);
}

.project-name {
  margin: 0 0 var(--spacing-2) 0;
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.project-description {
  flex-grow: 1;
  margin: 0 0 var(--spacing-4) 0;
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-languages {
  display: flex;
  flex-wrap: wrap;
  margin: calc(var(--spacing-1) * -1);
  margin-bottom: var(--spacing-4);
}

.language-tag {
  display: flex;
  align-items: center;
  margin: var(--spacing-1);
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.language-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: var(--spacing-1);
}

.project-link {
  display: inline-flex;
  align-items: center;
  font-size: var(--text-sm);
  color: var(--link-color);
  text-decoration: none;
  transition: color var(--transition-fast);
}

@media (hover: hover) {
  .project-link:hover {
    color: var(--accent-primary);
  }

  .project-link:hover .link-icon {
    transform: translate(2px, -2px);
  }
}

.link-icon {
  width: 14px;
  height: 14px;
  margin-left: var(--spacing-1);
  transition: transform var(--transition-fast);
}

/* 响应式 */
@media (max-width: 768px) {
  .project-card {
    padding: var(--spacing-4);
  }

  .project-name {
    font-size: var(--text-base);
  }

  .project-description {
    font-size: var(--text-xs);
  }
}
</style>
