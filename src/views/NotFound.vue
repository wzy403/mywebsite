<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/" style="color: white;">Go to Home</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  setup() {
    return {};
  },
};
</script>

<style scoped>
.not-found{
  text-align: center;
  color: #ffff;
  margin-top: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  vertical-align: middle;
}
</style>
