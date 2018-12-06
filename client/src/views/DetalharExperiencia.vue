<template>
  <div>
    <b-container class="form-margin-exp">
      <DetalhesExperiencia />
  </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import DetalhesExperiencia from '@/components/Experiencias/DetalhesExperiencia.vue';

export default {
  name: 'detalhesExperiencia',
  components: {
    DetalhesExperiencia,
  },
};
</script>

<style>
.form-margin-exp {
  margin-top: 20px;
}
</style>
