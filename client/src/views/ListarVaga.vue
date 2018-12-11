<template>
  <div>
    <b-container class="busca-container">
      <ListaVagas />
  </b-container>
  </div>
</template>

<script>
import ListaVagas from '@/components/Vagas/ListaVagas.vue';

export default {
  name: 'listarVaga',
  components: {
    ListaVagas,
  },
};
</script>

<style>
</style>
