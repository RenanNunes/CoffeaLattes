<template>
  <div>
    <b-container class="form-margin-review">
      <FormReview />
  </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import FormReview from '@/components/Reviews/FormReview.vue';

export default {
  name: 'novaReview',
  components: {
    FormReview,
  },
};
</script>

<style>
.form-margin-review {
  margin-top: 20px;
}
</style>
