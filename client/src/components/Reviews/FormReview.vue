<template>
  <div class="form-review">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <h3>Gostaria de avaliar sua experiência?</h3>
      <br />

      <b-form-group id="opinioesLabel"
                    label="Conte como foi *"
                    label-for="opinioes">
        <b-form-textarea id="opinioes"
                        v-model="review.opinioes"
                        placeholder="O que achou de trabalhar lá?"
                        required
                        :rows="3"
                        :max-rows="6">
        </b-form-textarea>
      </b-form-group>
      <b-form-checkbox id="checkbox1"
                       v-model="review.recomenda"
                       :indeterminate.sync="indeterminate">
        Recomendaria para outras pessoas *
      </b-form-checkbox>
      <br />
      <br />
      <b-container>
        <b-row>
          <b-col><h5>Dê uma nota para os quesitos:</h5></b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group id="ambienteLabel"
                          label="Ambiente:"
                          label-for="ambiente">
              <b-form-input id="ambiente"
                            type="number"
                            v-model="review.notas.ambiente"
                            placeholder="De 0 a 5"
                            min=0
                            max=5>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="aprendizadoLabel"
                          label="Aprendizado:"
                          label-for="aprendizado">
              <b-form-input id="aprendizado"
                            type="number"
                            v-model="review.notas.aprendizado"
                            placeholder="De 0 a 5"
                            min=0
                            max=5>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="autonomiaLabel"
                          label="Autonomia:"
                          label-for="autonomia">
              <b-form-input id="autonomia"
                            type="number"
                            v-model="review.notas.autonomia"
                            placeholder="De 0 a 5"
                            min=0
                            max=5>
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
      <hr />

      <b-button type="submit" variant="primary" class="botao-form">Concluir</b-button>
      <b-button type="reset" variant="danger" class="botao-form">Limpar</b-button>
      <br />
      <br />
      <b-alert :show="!!success" variant="success">Obrigado por compartilhar ^^</b-alert>
      <b-alert :show="!!error" variant="warning">{{error}}</b-alert>
    </b-form>
  </div>
</template>

<script>
const API_URL = process.env.API_URL || 'http://localhost:3000';

export default {
  data() {
    return {
      review: {
        opinioes: '',
        recomenda: false,
        empresa: '',
        notas: {
          ambiente: '',
          aprendizado: '',
          autonomia: '',
        }
      },
      error: '',
      success: '',
      show: true,
      indeterminate: true,
    }
  },
  async created() {
      this.exp = this.$route.params && this.$route.params.exp;
      this.review.empresa = this.$route.params && this.$route.params.emp;
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      const result = await fetch(API_URL+'/reviews/criar', {
        method: 'POST',
        body: JSON.stringify(this.review),
        headers: {
          'content-type': 'application/json',
        },
      });
      const resultJSON = await result.json();
      if (resultJSON.erro) {
        this.error = resultJSON.mensagem;
        this.success = '';
      } else {
        this.review.opinioes = '';
        this.review.recomenda = false;
        this.review.notas = {
          ambiente: '',
          aprendizado: '',
          autonomia: '',
        };
        this.error = '';
        this.success = true;
        this.$router.push({ name: 'listarExperiencia' });
      }
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our exp values */
      this.review.opinioes = '';
      this.review.recomenda = false;
      this.review.notas = {
        ambiente: '',
        aprendizado: '',
        autonomia: '',
      };
      this.error = '';
      this.success = '';
      this.show = false;
      this.$nextTick(() => { this.show = true });
    },
  },
}
</script>

<style scoped>
.botao-form {
  margin: 4px;
}

.form-review {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
}
</style>
