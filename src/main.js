// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// 导入全局样式
import './styles/variables.scss';
import './styles/base.scss';
import './styles/typography.scss';
import './styles/animations.scss';

const app = createApp(App);

app.use(router);
app.mount('#app');
