<template>
  <h1>hola</h1>
  <p>api {{ apiUrl }} </p>
</template>

<script>

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      aaa: '',
      apiUrl: process.env.VUE_APP_API_URL
    }
  },
  methods: {
    asd() {
      this.aaa
    }
  },
  
  
}
</script>
