<template>
  <div>
    <b-container class="form-margin-user">
      <Login />
  </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Usuarios/Login.vue';

export default {
  name: 'login',
  components: {
    Login,
  },
};
</script>

<style>
.form-margin-user {
  margin-top: 20px;
}
</style>
