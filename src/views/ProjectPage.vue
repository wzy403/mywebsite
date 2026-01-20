<template>
  <div class="project-page">
    <NavBar />

    <main class="project-main">
      <header class="project-header">
        <h1 class="page-title">Projects</h1>
        <p class="page-subtitle">创意之作，技术实践</p>
      </header>

      <div class="project-container">
        <div v-if="projects.length === 0" class="loading">
          <span class="loading-text">Loading...</span>
        </div>
        <div v-else class="projects-grid">
          <ProjectCard
            v-for="projectInfo in projects"
            :key="projectInfo.id"
            :project="projectInfo"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'ProjectPage',
  components: {
    ProjectCard,
    NavBar,
  },
  data() {
    return {
      projects: []
    };
  },
  created() {
    this.projects = require('@/assets/projectesList.json');
  }
};
</script>

<style scoped>
.project-page {
  min-height: 100vh;
}

.project-main {
  padding-top: calc(60px + var(--spacing-8));
  padding-bottom: var(--spacing-12);
}

.project-header {
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

.project-container {
  max-width: var(--container-lg);
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

.loading {
  text-align: center;
  padding: var(--spacing-12);
  color: var(--text-tertiary);
}

.loading-text {
  font-size: var(--text-base);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-6);
}

/* 响应式 */
@media (max-width: 768px) {
  .project-main {
    padding-top: calc(56px + var(--spacing-6));
  }

  .page-title {
    font-size: var(--text-2xl);
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .project-container {
    padding: 0 var(--spacing-2);
  }

  .projects-grid {
    gap: var(--spacing-4);
  }
}
</style>
