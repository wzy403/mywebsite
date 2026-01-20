<template>
  <button
    class="theme-toggle"
    :class="{ dark: isDark }"
    @click="toggleTheme"
    :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
    :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
  >
    <span class="toggle-track">
      <span class="toggle-icon sun">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      </span>
      <span class="toggle-icon moon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </span>
      <span class="toggle-slider"></span>
    </span>
  </button>
</template>

<script>
import { useTheme } from '@/composables/useTheme';

export default {
  name: 'ThemeToggle',
  setup() {
    const { isDark, toggleTheme } = useTheme();
    return { isDark, toggleTheme };
  }
};
</script>

<style scoped>
.theme-toggle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}

.toggle-track {
  position: relative;
  display: flex;
  align-items: center;
  width: 52px;
  height: 28px;
  padding: 2px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  border: 1px solid var(--border-color);
  transition: background var(--transition-normal),
              border-color var(--transition-normal);
}

.toggle-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: var(--text-tertiary);
  transition: opacity var(--transition-normal),
              color var(--transition-normal);
}

.toggle-icon svg {
  width: 14px;
  height: 14px;
}

.toggle-icon.sun {
  left: 6px;
  opacity: 1;
}

.toggle-icon.moon {
  right: 6px;
  opacity: 0.4;
}

.toggle-slider {
  position: absolute;
  left: 2px;
  width: 22px;
  height: 22px;
  background: var(--bg-primary);
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 深色模式状态 */
.theme-toggle.dark .toggle-track {
  background: var(--bg-tertiary);
}

.theme-toggle.dark .toggle-slider {
  transform: translateX(24px);
}

.theme-toggle.dark .toggle-icon.sun {
  opacity: 0.4;
}

.theme-toggle.dark .toggle-icon.moon {
  opacity: 1;
  color: var(--accent-secondary);
}

/* 悬停效果 */
.theme-toggle:hover .toggle-track {
  border-color: var(--accent-primary);
}

.theme-toggle:focus-visible .toggle-track {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
</style>
