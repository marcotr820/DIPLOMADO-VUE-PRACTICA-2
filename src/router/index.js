import { createRouter, createWebHistory } from 'vue-router'
import AutorList from '@/views/AutorList.vue'
import AutorEdit from '@/views/AutorEdit.vue'
import LibroEdit from '@/views/LibroEdit.vue'
import LibroList from '@/views/LibroList.vue'

const routes = [
  {
    path: '/',
    name: 'AutorList',
    component: AutorList
  },
  {
    path: '/libros',
    name: 'LibroList',
    component: LibroList,
  },
  {
    path: '/autores/create-update/:id?',
    name: 'AutorEdit',
    component: AutorEdit,
    props: true,
  },
  {
    path: '/libros/create-update/:id?',
    name: 'LibroEdit',
    component: LibroEdit,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
