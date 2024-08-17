<template>
   <div>
      <h1>Libros List</h1>
      <router-link to="/libros/create-update">Crear Libro</router-link>
      <span>|</span>
      <router-link to="/">Ver Autores</router-link>
      <table>
         <thead>
            <tr>
               <th>ID</th>
               <th>Titulo</th>
               <th>Descripcion</th>
               <th>Opciones</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="libro in libros" :key="libro.id">
               <td>{{ libro.id }}</td>
               <td>{{ libro.title }}</td>
               <td>{{ libro.desc }}</td>
               <td>
                  <router-link :to="{ name: 'LibroEdit', params: { id: libro.id } }">editar</router-link>|
                  <button @click="deleteLibro(libro.id)">Delete</button>
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
         libros: [],
      }
   },
   methods: {
      getLibros() {
         const vm = this;
         this.axios.get(`${this.apiUrl}/libros`).then(resp => {
            vm.libros = resp.data
         })
            .catch(err => {
               console.log(err);
            });
      },
      deleteLibro(id) {
         const confirmed = window.confirm('Estas seguro de eliminar este Libro?');
         if (confirmed) {
            this.axios.delete(`${this.apiUrl}/libros/${id}`)
               .then((_) => {
                  console.log('OK');
                  this.getLibros();
               })
               .catch(err => {
                  console.log(err);
               })
         }

      }
   },
   created() {
      this.getLibros();
   }

}
</script>