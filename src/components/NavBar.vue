<template>
  <div class="NavBar">
    <router-link class="router-tag" to="/">Home</router-link>
    <router-link class="router-tag" to="/blog">Blog</router-link>
    <router-link class="router-tag" to="/project">Projects</router-link>
    <router-link class="router-tag" to="/about">About</router-link>
  </div>
</template>

<script scoped>
export default {
  name: "NavBar",
  data() {
    return {
    }
  },
};
</script>

<style scoped>
.NavBar {
  display: flex;
  justify-content: center;
  align-items: baseline;
  font-size: 25px;
}

.NavBar .router-tag {
  margin: 0 15px;
  text-decoration: none;
  color: rgb(180, 180, 180); 
  position: relative;
}

.NavBar .router-tag:not(:last-child)::after {
  content: "|"; 
  position: absolute;
  align-content: center;
  right: -20px; 
  color: gray; 
}

body {
  margin: 0;
  font-family: Arial, sans-serif; 
}

@media (max-width: 431px) {
  .NavBar {
    transform: scale(0.8);
  }
}
</style>
