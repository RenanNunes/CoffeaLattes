<template>
  <div>
    <b-container class="busca-container">
      <FormBusca />
      <br />
      <ListaExperiencias />
  </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import FormBusca from '@/components/Experiencias/FormBusca.vue';
import ListaExperiencias from '@/components/Experiencias/ListaExperiencias.vue';

export default {
  name: 'listarExperiencia',
  components: {
    FormBusca,
    ListaExperiencias,
  },
};
</script>

<style>
.busca-container {
  margin-top: 20px;
}
</style>
