<template>
   <div>
      <h1 class="mt-3">{{ libroId ? 'Editar Libro' : 'Crear Libro' }}</h1>
      <div class="card">
         <div class="card-body">
            <form @submit.prevent="saveLibro">
               <div class="mb-3 row">
                  <label for="title" class="col-sm-2 col-form-label">Titulo</label>
                  <div class="col-sm-10">
                     <input v-model="libro.title" class="form-control" type="text" id="title" required />
                  </div>
               </div>
               <div class="mb-3 row">
                  <label for="desc" class="col-sm-2 col-form-label">Descripcion</label>
                  <div class="col-sm-10">
                     <textarea name="desc" class="form-control" id="desc" v-model="libro.desc" required></textarea>
                  </div>
               </div>
               <div class="mb-3 row">
                  <label for="autor" class="col-sm-2 col-form-label">Autor</label>
                  <div class="col-sm-10">
                     <select class="form-select" id="autor" v-model="libro.autorId" required>
                        <option v-for="autor in autores" :key="autor.id" :value="autor.id">{{ autor.name }}</option>
                     </select>
                  </div>
               </div>

               <button class="btn btn-primary" type="submit">{{ libroId ? 'Editar' : 'Crear' }}</button>
            </form>
         </div>
      </div>

      <br>
      <router-link to="/libros">Volver</router-link>
   </div>
</template>

<script>
export default {
   props: ['id'],
   data() {
      return {
         apiUrl: process.env.VUE_APP_API_URL,
         libroId: this.$route.params.id,
         libro: { title: '', desc: '', autorId: null },
         autores: [],
      };
   },
   methods: {
      getLibros() {
         if (this.libroId) {
            this.axios.get(`${this.apiUrl}/libros/${this.libroId}`)
               .then(resp => {
                  this.libro = resp.data;
               }).catch(err => {
                  console.log(err);
               });
         }
      },
      saveLibro() {
         if (this.libroId) {
            this.axios.put(this.apiUrl + '/libros/' + this.libroId, this.libro)
               .then((_) => {
                  console.log('OK');
               }
               ).catch(err => {
                  console.log(err);
               });
         } else {
            this.axios.post(this.apiUrl + '/libros', this.libro)
               .then((_) => {
                  console.log('OK');
               }
               ).catch(err => {
                  console.log(err);
               });
         }
         this.$router.push('/libros');
      },
      getAutores() {
         const vm = this;
         this.axios.get(`${this.apiUrl}/autores`).then(
            function (response) {
               vm.autores = response.data
            }
         )
      },
   },
   created() {
      this.getAutores();
      if (this.libroId) {
         this.getLibros();
      }
   },
};
</script>