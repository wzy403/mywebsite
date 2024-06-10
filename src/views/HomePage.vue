<!-- src/views/Home.vue -->
<template>
  <div>
    <h1>welcome!</h1>
    <section class="welcome">
      <h1>Hi 👋, I'm Zhengyu (Joey) Wang</h1>
      <h2>A second-year CS specialist + STA major + MAT minor student at the University of Toronto.</h2>
      <h4>This website showcases my work, projects, blog posts, and more. Feel free to explore and learn more about me.</h4>
      <!-- <h3>A .</h3> -->
      <div class="signature">
        <h4>正因为是废物，所以才要比任何人都认真的活着</h4>
      </div>
    </section>

    <section class="connect">
      <h3>Connect with Me</h3>
      <p class="social-icons">
        <a href="https://github.com/wzy403" target="blank"><img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/github.svg" alt="GitHub" height="30" width="40" style="filter: invert(0) brightness(0) contrast(1);"/></a>
        <a href="https://twitter.com/woshiyingyan" target="blank"><img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="Twitter" height="30" width="40" /></a>
        <a href="https://linkedin.com/in/wzy403" target="blank"><img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="LinkedIn" height="30" width="40" /></a>
        <a href="https://instagram.com/xdwoshiyingyan" target="blank"><img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="Instagram" height="30" width="40" /></a>
        <a href="https://www.leetcode.com/zhengyu-joey-wang" target="blank"><img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg" alt="LeetCode" height="30" width="40" /></a>
        <PopModal :visible="isModalVisible" :imageSrc="imageSrc" @close="isModalVisible = false"/>
        <button class="QQ-button" @click="showModal()"><img src="../assets/QQ.svg" alt="Wechat" height="30" width="40" /></button>
      </p>
    </section>


    <section class="skills">
      <h3>Languages and Tools</h3>
      <p>
        <a href="https://aws.amazon.com" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS" width="40" height="40" /></a>
        <a href="https://www.cprogramming.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg" alt="C" width="40" height="40" /></a>
        <a href="https://www.w3schools.com/cpp/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" alt="C++" width="40" height="40" /></a>
        <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="CSS3" width="40" height="40" /></a>
        <a href="https://git-scm.com/" target="_blank" rel="noreferrer"><img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="Git" width="40" height="40" /></a>
        <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="HTML5" width="40" height="40" /></a>
        <a href="https://www.java.com" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="Java" width="40" height="40" /></a>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="JavaScript" width="40" height="40" /></a>
        <a href="https://www.linux.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" alt="Linux" width="40" height="40" /></a>
        <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="MySQL" width="40" height="40" /></a>
        <a href="https://www.php.net" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" alt="PHP" width="40" height="40" /></a>
        <a href="https://www.python.org" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="Python" width="40" height="40" /></a>
        <a href="https://spring.io/" target="_blank" rel="noreferrer"><img src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" alt="Spring" width="40" height="40" /></a>
        <a href="https://www.sqlite.org/" target="_blank" rel="noreferrer"><img src="https://www.vectorlogo.zone/logos/sqlite/sqlite-icon.svg" alt="SQLite" width="40" height="40" /></a>
        <a href="https://vuejs.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original-wordmark.svg" alt="Vue.js" width="40" height="40" /></a>
      </p>
      <p>You can reach me at: <a href="mailto:zhengyu.wang0108@gmail.com">zhengyu.wang0108@gmail.com</a></p>
    </section>
  </div>
</template>

<script>

import PopModal from "../components/PopModal.vue"

export default {
  name: "HomePage",
  components: {
    PopModal
  },
  data() {
    return {
      isModalVisible: false,
      imageSrc: 'QQ-QRCode.jpg' // 这里替换成你的图片URL
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    }
  }
};
</script>

<style scoped>
.welcome {
  text-align: center;
  margin-bottom: 20px;
}
.signature {
  background-color: #f0f0f098;
  /* border-left: 4px solid #4CAF50; */
  padding: 1px 20px;
  display: inline-block;
  font-style: italic;
  font-size: 16px;
  margin-top: 10px;
  border-radius: 100px;
}
.QQ-button{
  border: none;
  background-color: white;
  cursor: pointer;
}
</style>
