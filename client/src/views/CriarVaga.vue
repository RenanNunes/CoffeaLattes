<template>
  <div>
    <b-container class="form-margin-exp">
      <FormVaga />
  </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import FormVaga from '@/components/Vagas/FormVaga.vue';

export default {
  name: 'novaExperiencia',
  components: {
    FormVaga,
  },
};
</script>

<style>
.form-margin-exp {
  margin-top: 20px;
}
</style>
