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
    meta: {title: 'Zhengyu Wang | Code, Design, and Life'}
  },
  {
    path: '/project',
    name: 'ProjectPage',
    component: ProjectPage,
    meta: {title: 'Projects (创意之作) | Zhengyu Wang'}
  },
  {
    path: '/blog',
    name: 'BlogPage',
    component: BlogPage,
    meta: {title: 'Blog (笔耕不辍) | Zhengyu Wang'}
  },
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: BlogPostPage
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage,
    meta: {title: 'Hello, I\'m Zhengyu'}
  },
  {
    path: '/:catchAll(.*)',
    name: 'notfound',
    component: NotFound,
    meta: {title: 'How did you get here?'}
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
