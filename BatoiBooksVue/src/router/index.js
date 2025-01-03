import { createRouter, createWebHistory } from 'vue-router';
import BooksList from '../components/BooksList.vue';
import AddBook from '../components/AddBook.vue';
import AppAbout from '../components/AppAbout.vue';

const routes = [
  { path: '/', component: BooksList },
  { path: '/add', component: AddBook },
  { path: '/about', component: AppAbout },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
