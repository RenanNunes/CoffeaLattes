<template>
  <div>
    <b-container class="busca-container">
      <FormBusca />
  </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import FormBusca from '@/components/Experiencias/FormBusca.vue';

export default {
  name: 'buscarExperiencia',
  components: {
    FormBusca,
  },
};
</script>

<style>
.busca-container {
  margin-top: 20px;
}
</style>
