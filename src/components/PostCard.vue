<template>
  <div
    class="post-card"
    :class="{ 'is-pressed': isPressed }"
    @click="navigateToPost"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <span class="post-date">{{ formatDate(post.date) }}</span>
    <h3 class="post-title">{{ post.title }}</h3>
    <span class="post-arrow">→</span>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: "PostCard",
  props: {
    post: {
      type: Object,
      default: () => ({})
    },
  },
  setup(props) {
    const router = useRouter();
    const isPressed = ref(false);

    const navigateToPost = () => {
      router.push(`/blog/${props.post.id}`);
    };

    const formatDate = (date) => {
      if (!date) return '';
      const d = new Date(date);
      const month = d.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
      const day = d.getUTCDate();
      return `${month} ${day}`;
    };

    const onTouchStart = () => {
      isPressed.value = true;
    };

    const onTouchEnd = () => {
      isPressed.value = false;
    };

    return {
      navigateToPost,
      formatDate,
      isPressed,
      onTouchStart,
      onTouchEnd
    };
  }
};
</script>

<style scoped>
.post-card {
  display: flex;
  align-items: center;
  padding: var(--spacing-4) var(--spacing-5);
  margin: var(--spacing-2) 0;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 桌面端 hover 效果 */
@media (hover: hover) {
  .post-card:hover {
    background: var(--bg-tertiary);
    transform: translateX(8px);
  }

  .post-card:hover .post-title {
    color: var(--accent-primary);
  }

  .post-card:hover .post-arrow {
    opacity: 1;
    transform: translateX(4px);
  }
}

/* 移动端点击效果 */
.post-card {
  -webkit-tap-highlight-color: transparent;
}

.post-card.is-pressed {
  transform: scale(0.97);
  background: var(--bg-tertiary);
}

.post-card.is-pressed .post-title {
  color: var(--accent-primary);
}

.post-date {
  flex-shrink: 0;
  width: 60px;
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  font-family: var(--font-mono);
}

.post-title {
  flex: 1;
  margin: 0;
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--text-primary);
  transition: color var(--transition-fast);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.post-arrow {
  flex-shrink: 0;
  margin-left: var(--spacing-3);
  color: var(--text-tertiary);
  opacity: 0;
  transition: all var(--transition-fast);
}

/* 响应式 */
@media (max-width: 768px) {
  .post-card {
    padding: var(--spacing-3) var(--spacing-4);
  }

  .post-date {
    width: 50px;
    font-size: var(--text-xs);
  }

  .post-title {
    font-size: var(--text-sm);
  }
}

@media (max-width: 480px) {
  .post-card {
    flex-direction: column;
    align-items: flex-start;
    padding: var(--spacing-3);
  }

  .post-date {
    width: auto;
    margin-bottom: var(--spacing-1);
  }

  .post-title {
    white-space: normal;
    line-height: var(--leading-snug);
  }

  .post-arrow {
    display: none;
  }
}
</style>
