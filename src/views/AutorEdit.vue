<template>
   <div>
      <h1>{{ autorId ? 'Editar autor' : 'Crear autor' }}</h1>
      <form @submit.prevent="saveautor">
         <label for="name">Nombre:</label>
         <input v-model="autor.name" type="text" id="name" required />
         <button type="submit">{{ autorId ? 'Editar' : 'Crear' }}</button>
      </form>
      <br>
      <router-link to="/">Volver</router-link>
   </div>
</template>

<script>
export default {
   props: ['id'],
   data() {
      return {
         apiUrl: process.env.VUE_APP_API_URL,
         autorId: this.$route.params.id,
         autor: { name: '' },
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