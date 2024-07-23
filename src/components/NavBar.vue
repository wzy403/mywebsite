<template>
  <div class="NavBar">
    <a href="/">Home</a>
    <a href="/project">Projects</a>
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
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

.NavBar a {
  margin: 0 15px; /* 设置链接之间的间距 */
  text-decoration: none; /* 去掉下划线 */
  color: purple; /* 设置链接颜色 */
  position: relative; /* 使伪元素相对于链接定位 */
}

.NavBar a:not(:last-child)::after {
  content: "|"; /* 分隔符内容 */
  position: absolute;
  align-content: center;
  right: -17px; /* 调整分隔符位置 */
  color: gray; /* 分隔符颜色 */
}

body {
  margin: 0; /* 去掉默认的边距 */
  font-family: Arial, sans-serif; /* 设置字体 */
}
</style>
