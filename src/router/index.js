// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
// import HomePage from './App.vue';
import ProjectPage from '@/views/ProjectPage.vue';
import BlogPage from '@/views/BlogPage.vue';
import AboutPage from '@/views/AboutPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {title: 'Zhengyu Wang'}
  },
  {
    path: '/project',
    name: 'ProjectPage',
    component: ProjectPage,
  },
  {
    path: '/blog',
    name: 'BlogPage',
    component: BlogPage,
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage,
  },
  
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) =>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next();
})

export default router;
