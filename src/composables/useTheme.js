import { ref, watch } from 'vue';

const isDark = ref(false);

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };

  const setTheme = (dark) => {
    isDark.value = dark;
  };

  const initTheme = () => {
    // 优先读取本地存储
    const stored = localStorage.getItem('theme');
    if (stored) {
      isDark.value = stored === 'dark';
    } else {
      // 否则跟随系统
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      isDark.value = mediaQuery.matches;
    }

    // 应用主题
    applyTheme(isDark.value);

    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      // 只有在没有用户手动设置时才跟随系统
      if (!localStorage.getItem('theme')) {
        isDark.value = e.matches;
      }
    });
  };

  const applyTheme = (dark) => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    // 更新 meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', dark ? '#1A1917' : '#FAF8F5');
    }
  };

  // 监听 isDark 变化
  watch(isDark, (newVal) => {
    applyTheme(newVal);
    localStorage.setItem('theme', newVal ? 'dark' : 'light');
  });

  return {
    isDark,
    toggleTheme,
    setTheme,
    initTheme
  };
}
