<template>
  <div>
    <b-container class="form-margin-exp">
      <DetalhesExperiencia :exp="exp" />
      <DetalhesReview :review="review" />
  </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import DetalhesExperiencia from '@/components/Experiencias/DetalhesExperiencia.vue';
import DetalhesReview from '@/components/Reviews/DetalhesReview.vue';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export default {
  name: 'detalhesExperiencia',
  components: {
    DetalhesExperiencia,
    DetalhesReview,
  },
  data() {
    return {
      exp: {},
      review: null,
    }
  },
  async created() {
    const id = this.$route.params && this.$route.params.id;
    const result = await fetch(API_URL + '/experiencia/buscar?id=' + id + '&rvw=true', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    const resultJSON = await result.json();
    if (resultJSON && resultJSON._id) {
      this.exp = resultJSON;
      this.review = this.exp.review && this.exp.review[0];
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
