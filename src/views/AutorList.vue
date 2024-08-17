<template>
   <div>
      <h1 class="mt-3">Autores List</h1>
      <router-link class="btn btn-link" to="/autores/create-update">Crear Autor</router-link>
      <span class="mx-2"></span>
      <router-link class="btn btn-link" to="/libros">Ver libros</router-link>
      <br><br>
      <input v-model="filtroAutor" ype="text" class="form-control mb-3" placeholder="Buscar...">
      <input id="filtroFortuna" type="checkbox" v-model="filtrarPorFortuna" /><label for="filtroFortuna">Mostrar solo
         autores con fortuna mayor a 1,000,000</label>
      <br><br>
      <table class="table table-bordered table-striped">
         <thead>
            <tr>
               <th>ID</th>
               <th>Nombre</th>
               <th>Fortuna</th>
               <th>Opciones</th>
            </tr>
         </thead>
         <tbody>
            <tr v-if="filtrarAutoresComputada == 0">
               <td colspan="4">Sin registros.</td>
            </tr>
            <tr v-for="autor in filtrarAutoresComputada" :key="autor.id">
               <td>{{ autor.id }}</td>
               <td>{{ autor.name }}</td>
               <td>{{ autor.fortuna }}</td>
               <td>
                  <router-link class="btn btn-primary mx-2"
                     :to="{ name: 'AutorEdit', params: { id: autor.id } }">editar</router-link>
                  <button class="btn btn-danger" @click="deleteAutor(autor.id)">Delete</button>
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
         filtroAutor: '',
         filtrarPorFortuna: false
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
   },
   computed: {
      filtrarAutoresComputada() {
         return this.autores.filter(x => {
            const buscaPorFortuna = this.filtrarPorFortuna ? x.fortuna > 1000000 : true;
            const buscaPorNombre = x.name.toLowerCase().includes(this.filtroAutor.toLowerCase());
            return buscaPorFortuna && buscaPorNombre;
         })
            
      }
   }

}
</script>