<template>
  <div>
    <b-container class="form-margin-user">
      <FormUsuario />
  </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import FormUsuario from '@/components/Usuarios/FormUsuario.vue';

export default {
  name: 'novoUsuario',
  components: {
    FormUsuario,
  },
};
</script>

<style>
.form-margin-user {
  margin-top: 20px;
}
</style>
