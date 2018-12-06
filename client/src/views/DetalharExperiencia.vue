<template>
  <div>
    <b-container class="form-margin-exp">
      <DetalhesExperiencia :exp="exp" />
  </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import DetalhesExperiencia from '@/components/Experiencias/DetalhesExperiencia.vue';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export default {
  name: 'detalhesExperiencia',
  components: {
    DetalhesExperiencia,
  },
  data() {
    return {
      exp: {}
    }
  },
  async created() {
    const id = this.$route.params && this.$route.params.id;
    const result = await fetch(API_URL + '/experiencia/buscar?id=' + id, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    const resultJSON = await result.json();
    if (resultJSON._id) {
      this.exp = resultJSON;
    } else {
      this.exp = {
        erro: true,
      };
    }
  }
};
</script>

<style>
.form-margin-exp {
  margin-top: 20px;
}
</style>
