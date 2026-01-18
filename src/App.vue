<template>
  <div id="app">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade-slide'" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useTheme } from '@/composables/useTheme';

export default {
  name: "App",
  setup() {
    const { initTheme } = useTheme();

    onMounted(() => {
      initTheme();
    });

    return {};
  }
};
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
