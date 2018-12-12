<template>
  <div>
    <b-container class="busca-container">
      <BuscaEmpresas />
      <br />
      <ListaEmpresas />
  </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import BuscaEmpresas from '@/components/Empresas/BuscaEmpresas.vue';
import ListaEmpresas from '@/components/Empresas/ListaEmpresas.vue';

export default {
  name: 'listarEmpresa',
  components: {
    BuscaEmpresas,
    ListaEmpresas,
  },
};
</script>

<style>
.busca-container {
  margin-top: 20px;
}
</style>
