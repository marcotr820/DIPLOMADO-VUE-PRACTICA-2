<template>
   <div>
      <h1>Autores List</h1>
      <router-link to="/autores/create-update">Crear Autor</router-link>
      <span>|</span>
      <router-link to="/libros">Ver libros</router-link>
      <table>
         <thead>
            <tr>
               <th>ID</th>
               <th>Nombre</th>
               <th>Opciones</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="autor in autores" :key="autor.id">
               <td>{{ autor.id }}</td>
               <td>{{ autor.name }}</td>
               <td>
                  <router-link :to="{ name: 'AutorEdit', params: { id: autor.id } }">editar</router-link>|
                  <button @click="deleteAutor(autor.id)">Delete</button>
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<script>

export default {
   name: 'AutoresList',
   components: {},
   data() {
      return {
         apiUrl: process.env.VUE_APP_API_URL,
         autores: [],
      }
   },
   methods: {
      getAutores() {
         const vm = this;
         this.axios.get(`${this.apiUrl}/autores`).then(
            function (response) {
               vm.autores = response.data
            }
         )
      },
      deleteAutor(id) {
         const confirmed = window.confirm('Estas seguro de eliminar este Autor?');
         if (confirmed) {
            this.axios.delete(`${this.apiUrl}/autores/${id}`)
               .then((_) => {
                  console.log('OK');
                  this.getAutores();
               })
               .catch(err => {
                  console.log(err);
               })
         }
      }
   },
   created() {
      this.getAutores();
   }

}
</script>