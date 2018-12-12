<template>
  <div>
    <b-container class="form-margin-emp">
      <DetalheEmpresa :emp="emp" />
  </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import DetalheEmpresa from '@/components/Empresas/DetalheEmpresa.vue';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export default {
  name: 'detalheEmpresa',
  components: {
    DetalheEmpresa,
  },
  data() {
    return {
      emp: {}
    }
  },
  async created() {
    const id = this.$route.params && this.$route.params.id;
    const result = await fetch(API_URL + '/empresa/buscar?id=' + id, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    const resultJSON = await result.json();
    if (resultJSON && resultJSON._id) {
      this.emp = resultJSON;
    } else {
      this.emp = {
        erro: true,
      };
    }
  }
};
</script>

<style>
.form-margin-emp {
  margin-top: 20px;
}
</style>
