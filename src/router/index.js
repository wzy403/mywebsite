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
    meta: {title: 'Zhengyu Wang'}
  },
  {
    path: '/blog',
    name: 'BlogPage',
    component: BlogPage,
    meta: {title: 'Zhengyu Wang'}
  },
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: BlogPostPage,
    meta: {title: 'Zhengyu Wang'}
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage,
    meta: {title: 'Zhengyu Wang'}
  },
  {
    path: '/:catchAll(.*)',
    name: 'notfound',
    component: NotFound,
    meta: {title: 'Zhengyu Wang'}
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
