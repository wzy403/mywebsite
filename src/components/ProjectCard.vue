<template>
  <div class="project-card">
    <h2>{{ project.name }}</h2>
    <p>{{ project.description }}</p>
    <div class="languages-div">
      <div v-for="language in project.languages" :key="language" class="language">
        <span :style="{ backgroundColor: languageColor(language) }" class="language-color"></span>
        <span class="language-text">{{ language }}</span>
      </div>
    </div>
    <a :href="project.url" target="_blank">View on GitHub</a>
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
  methods: {
    languageColor(language) {
      return colors[language] ? colors[language].color : '#ccc';
    },
  },
};
</script>

<style scoped>
.project-card {
  background: #fff;
  border: 1px solid #e1e4e8;
  color: #000;
  border-radius: 6px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(27, 31, 35, 0.12), 0 8px 24px rgba(27, 31, 35, 0.1);
  transition: transform 0.2s;
}

.project-card:hover {
  transform: scale(1.05);
}

.project-card h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.project-card p {
  font-size: 1em;
  color: #586069;
  margin-bottom: 20px;
}

.project-card a {
  color: #0366d6;
  text-decoration: none;
  font-weight: bold;
}

.project-card a:hover {
  text-decoration: underline;
}

.languages-div{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 15px;
  margin-left: 25px;
}

.language {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.language-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}

.language-text {
  margin-right: 15px;
}
</style>
