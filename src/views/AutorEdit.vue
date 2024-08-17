<template>
   <div>
      <h1 class="mt-3">{{ autorId ? 'Editar autor' : 'Crear autor' }}</h1>
      <div class="card">
         <div class="card-body">
            <form @submit.prevent="saveautor">
               <div class="mb-3 row">
                  <label for="name" class="col-sm-2 col-form-label">Nombre:</label>
                  <div class="col-sm-10">
                     <input class="form-control"v-model="autor.name" type="text" id="name" required />
                  </div>
               </div>
               <div class="mb-3 row">
                  <label for="fortuna" class="col-sm-2 col-form-label">Fortuna:</label>
                  <div class="col-sm-10">
                     <input class="form-control"v-model="autor.fortuna" type="number" id="fortuna" required />
                  </div>
               </div>
               <button class="btn btn-primary" type="submit">{{ autorId ? 'Editar' : 'Crear' }}</button>
            </form>
         </div>
      </div>
      <br>
      <router-link class="btn btn-link" to="/">Volver</router-link>
   </div>
</template>

<script>
export default {
   props: ['id'],
   data() {
      return {
         apiUrl: process.env.VUE_APP_API_URL,
         autorId: this.$route.params.id,
         autor: { name: '', fortuna: 0 },
      };
   },
   methods: {
      fetchautor() {
         if (this.autorId) {
            this.axios.get(`${this.apiUrl}/autores/${this.autorId}`)
               .then(resp => {
                  this.autor = resp.data;
               }).catch(err => {
                  console.log(err);
               });
         }
      },
      saveautor() {
         if (this.autorId) {
            this.axios.put(this.apiUrl + '/autores/' + this.autorId, this.autor)
               .then((_) => {
                  console.log('OK');
               }
               ).catch(err => {
                  console.log(err);
               });
         } else {
            this.axios.post(this.apiUrl + '/autores', this.autor)
               .then((_) => {
                  console.log('OK');
               }
               ).catch(err => {
                  console.log(err);
               });
         }
         this.$router.push('/');
      },
   },
   created() {
      if (this.autorId) {
         this.fetchautor();
      }
   },
};
</script>