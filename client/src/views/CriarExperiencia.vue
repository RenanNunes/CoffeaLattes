<template>
  <div>
    <b-container class="form-container">
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
.form-container {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
