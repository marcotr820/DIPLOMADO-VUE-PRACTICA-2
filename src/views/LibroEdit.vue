<template>
   <div>
      <h1>{{ libroId ? 'Editar Libro' : 'Crear Libro' }}</h1>
      <form @submit.prevent="saveLibro">
         <label for="title">Titulo:</label>
         <input v-model="libro.title" type="text" id="title" required />
         <br>
         <label for="title">Descripcion:</label>
         <textarea name="desc" id="desc" v-model="libro.desc"></textarea>
         <br>
         <label for="autor">Autor:</label>
         <select id="autor" v-model="libro.autorId" required>
            <option v-for="autor in autores" :key="autor.id" :value="autor.id">{{ autor.name }}</option>
         </select>
         <button type="submit">{{ libroId ? 'Editar' : 'Crear' }}</button>
      </form>
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