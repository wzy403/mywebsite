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
  /* justify-content: center; */
  align-items: baseline;
  font-size: 25px;
}

.NavBar .router-tag {
  margin: 0 15px; /* 设置链接之间的间距 */
  text-decoration: none; /* 去掉下划线 */
  color: rgb(180, 180, 180); /* 设置链接颜色 */
  position: relative; /* 使伪元素相对于链接定位 */
}

.NavBar .router-tag:not(:last-child)::after {
  content: "|"; /* 分隔符内容 */
  position: absolute;
  align-content: center;
  right: -20px; /* 调整分隔符位置 */
  color: gray; /* 分隔符颜色 */
}

body {
  margin: 0; /* 去掉默认的边距 */
  font-family: Arial, sans-serif; /* 设置字体 */
}
</style>
