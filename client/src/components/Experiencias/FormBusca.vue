<template>
  <div>
    <b-btn @click="showCollapse = !showCollapse"
           :class="showCollapse ? 'collapsed' : null"
           aria-controls="collapse"
           :aria-expanded="showCollapse ? 'true' : 'false'">
      <div v-if="showCollapse">Esconder busca ↑</div>
      <div v-else>Mostrar busca ↓</div>
    </b-btn>
    <b-collapse class="mt-2" v-model="showCollapse" id="collapse">
      <b-card class="form-exp">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <h3>Indique os critérios de busca!</h3>
          <br />
          <b-form-group id="cargoLabel"
                        label="Cargo"
                        label-for="cargo">
            <b-form-input id="cargo"
                          type="text"
                          v-model="exp.cargo"
                          placeholder="Nome do cargo">
            </b-form-input>
          </b-form-group>
          <b-form-group id="tipoLabel"
                        label="Tipo de estágio"
                        label-for="tipo">
            <b-form-select id="tipo"
                          :options="tipos"
                          v-model="exp.tipo">
            </b-form-select>
          </b-form-group>
          <b-form-group id="salarioLabel"
                        label="Salário:"
                        label-for="salario">
            <b-form-input id="salario"
                          type="number"
                          v-model="exp.salario"
                          placeholder="Salário"
                          min=0>
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary" class="botao-form">Concluir</b-button>
          <b-button type="reset" variant="danger" class="botao-form">Limpar</b-button>
          <br />
          <br />
          <b-alert :show="!!success" variant="success">Obrigado por compartilhar ^^</b-alert>
          <b-alert :show="!!error" variant="warning">{{error}}</b-alert>
        </b-form>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
const API_URL = process.env.API_URL || 'http://localhost:3000';

export default {
  data() {
    return {
      showCollapse: true,
      exp: {
        cargo: '',
        tipo: null,
        atividadesRealizadas: '',
        salario: '',
      },
      tipos: [
        { text: 'Selecione um', value: null },
        { text: 'Para curso semestral', value: 'semestral' },
        { text: 'Para curso quadrimestral', value: 'quadrimestral' },
        { text: 'Estágio de férias', value: 'ferias' },
        { text: 'Trainee', value: 'trainee' },
        { text: 'Outro', value: 'outro' },
      ],
      error: '',
      success: '',
      show: true,
    }
  },
  created() {
    this.showCollapse = !!(this.$route.params && this.$route.params.buscar);
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      const result = await fetch(API_URL+'/experiencia/buscar', {
        method: 'POST',
        body: JSON.stringify(this.exp),
        headers: {
          'content-type': 'application/json',
        },
      });
      const resultJSON = await result.json();
      if (resultJSON.erro) {
        this.error = resultJSON.mensagem;
        this.success = '';
      } else {
        this.exp.cargo = '';
        this.exp.tipo = null;
        this.exp.salario = '';
        this.error = '';
        this.success = true;
      }
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our exp values */
      this.exp.cargo = '';
      this.exp.tipo = null;
      this.exp.salario = '';
      this.error = '';
      this.success = '';
      /* Trick to reset/clear native browser exp validation state */
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

.form-exp{
  background-color: #f5f5f5;
}
</style>
