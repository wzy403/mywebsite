// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ProjectPage from '@/views/ProjectPage.vue';
import BlogPage from '@/views/BlogPage.vue';
import BlogPostPage from '@/views/BlogPostPage.vue'
import AboutPage from '@/views/AboutPage.vue';
import NotFound from '@/views/NotFound.vue';

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
    path: '/blog/:id',
    name: 'BlogPost',
    component: BlogPostPage,
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage,
  },
  {
    path: '/:catchAll(.*)',
    name: 'notfound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) =>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next();
})

export default router;
