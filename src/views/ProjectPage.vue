<template>
  <div class="projects-container">
    <h1>Projects</h1>
    <div v-if="projects.length === 0">Loading...</div>
    <div class="projects-grid">
      <div v-for="projectInfo in projects" :key="projectInfo.id" class="project-card">
        <ProjectCard :project="projectInfo" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProjectCard from '../components/ProjectCard.vue';
export default {
  name: 'ProjectPage',
  components: {
    ProjectCard,
  },
  data() {
    return {
      projects: []
    };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await axios.get('/api/projecte/getProjectes');
        this.projects = response.data;
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }
  }
};
</script>

<style scoped>
.projects-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
</style>
