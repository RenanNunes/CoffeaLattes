<template>
  <div class="form-review" v-if="review">
    <h3>Avaliação</h3>
    <hr />
    <div>
      <b-container>
        <b-row>
          <b-col>
            <b>Opinião:</b> {{review.opinioes}}
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b>Recomenda a experiência: </b> <b-form-checkbox v-model="review.recomenda" class="check-recomenda" disabled />
          </b-col>
        </b-row>
      </b-container>
      <br />
      <h5 v-if="review.notas && (review.notas.ambiente || review.notas.aprendizado || review.notas.autonomia)">Notas:</h5>
      <b-container v-if="review.notas">
        <b-row>
          <b-col v-if="review.notas.ambiente">
            <b>Ambiente:</b>{{' '}}
            <span>{{review.notas.ambiente}}</span>
          </b-col>
          <b-col v-if="review.notas.aprendizado">
            <b>Aprendizado:</b>{{' '}}
            <span>{{review.notas.aprendizado}}</span>
          </b-col>
          <b-col v-if="review.notas.autonomia">
            <b>Autonomia:</b>{{' '}}
            <span>{{review.notas.autonomia}}</span>
          </b-col>
        </b-row>
      </b-container>
      <hr />
      <b-button @click="showModal" variant="danger" class="botao-form">Apagar</b-button>
      <b-modal ref="myModalRef" hide-footer title="Apagar">
        <div class="d-block text-center">
          <h4>Tem certeza que deseja apagar a avaliação?</h4>
        </div>
        <b-btn class="mt-3" variant="outline-danger" block @click="apagar">Apagar</b-btn>
      </b-modal>
    </div>
  </div>
</template>

<script>
const API_URL = process.env.API_URL || 'http://localhost:3000';

export default {
  props: {
      review: {
        type: Object,
        required: false,
      }
  },
  methods: {
    showModal () {
      this.$refs.myModalRef.show()
    },
    apagar() {
      const id = this.review && this.review._id;
      fetch(API_URL + '/reviews/apagar?id=' + id, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      }).then(() => this.review = null);
    }
  }
}
</script>

<style scoped>
.botao-form {
  margin: 4px;
}

.form-review {
  background-color: #fcfcfc;
  padding: 15px;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
}

.col{
  padding-left: 0px;
}

.check-recomenda {
  vertical-align: middle;
  size: 2em;
}
</style>
