<template>
  <div>
    <b-container class="form-margin-user">
      <DetalheUsuario :user="user" />
  </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
	import DetalheUsuario from '@/components/Usuarios/DetalheUsuario.vue';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export default {
  name: 'detalheUsuario',
  components: {
    DetalheUsuario,
  },
  data() {
    return {
      user: {}
    }
  },
async created() {
	const id = this.$cookies.user;
    const result = await fetch(API_URL + '/usuarios/buscar?id=' + id, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    const resultJSON = await result.json();
    if (resultJSON && resultJSON._id) {
      this.user = resultJSON;
    }
    else {
      this.user = {
        erro: true,
      };
    }
  }
};
</script>

<style>
.form-margin-user {
  margin-top: 20px;
}
</style>
