<template>
  <div>
    <b-container class="busca-container">
      <FormBusca />
      <br />
      <ListaExperiencias :items="items" />
  </b-container>
  </div>
</template>

<script>
import FormBusca from '@/components/Experiencias/FormBusca.vue';
import ListaExperiencias from '@/components/Experiencias/ListaExperiencias.vue';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export default {
  name: 'listarExperiencia',
  components: {
    FormBusca,
    ListaExperiencias,
  },
  data() {
    return {
      items: [],
    }
  },
  created: function () {
    this.onStart();
  },
  methods:{
    async onStart() {
      const result = await fetch(API_URL+'/experiencia/buscar', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const resultJSON = await result.json();
      this.items = resultJSON;
    }
  }
};
</script>

<style>
.busca-container {
  margin-top: 20px;
}
</style>
