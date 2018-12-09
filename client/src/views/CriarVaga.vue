<template>
  <div>
    <b-container class="form-margin-vaga">
      <FormVaga />
  </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import FormVaga from '@/components/Vagas/FormVaga.vue';

export default {
  name: 'novaVaga',
  components: {
    FormVaga,
  },
};
</script>

<style>
.form-margin-vaga {
  margin-top: 20px;
}
</style>
