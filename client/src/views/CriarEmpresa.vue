<template>
  <div>
    <b-container class="form-margin-emp">
      <FormEmpresa />
  </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import FormEmpresa from '@/components/Empresas/FormEmpresa.vue';

export default {
  name: 'novaEmpresa',
  components: {
    FormEmpresa,
  },
};
</script>

<style>
.form-margin-emp {
  margin-top: 20px;
}
</style>
