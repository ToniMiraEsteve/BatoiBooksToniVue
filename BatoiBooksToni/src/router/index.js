import { createRouter, createWebHistory } from 'vue-router';
import BooksList from '../components/BooksList.vue';
import AddBook from '../components/AddBook.vue';
import AppCart from '../components/AppCart.vue';
import AppAbout from '../components/AppAbout.vue';



  const routes = [
      {
        path: '/',
        name: 'BooksList',
        component: BooksList,
      },
      {
        path: '/add-book',
        name: 'AddBook',
        component: AddBook,
      },
      {
        path: '/cart',
        name: 'AppCart',
        component: AppCart,
      },
      {
        path: '/about',
        name: 'AppAbout',
        component: AppAbout,
      },
      {
        path: '/edit-book/:id',
        name: 'EditBook',
        component: AddBook, // Reusaremos el componente AddBook
        props: true,
      },
  ];

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });



export default router
