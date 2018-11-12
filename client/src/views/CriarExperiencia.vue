<template>
  <div>
    <b-container class="form-margin-exp">
      <FormExperiencia />
  </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import FormExperiencia from '@/components/Experiencias/FormExperiencia.vue';

export default {
  name: 'novaExperiencia',
  components: {
    FormExperiencia,
  },
};
</script>

<style>
.form-margin-exp {
  margin-top: 20px;
}
</style>
