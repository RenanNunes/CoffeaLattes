<template>
  <div class="form-exp">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <h3>Conte-nos sobre sua experiência!</h3>
      <br />
      <b-form-group id="cargoLabel"
                    label="Cargo: *"
                    label-for="cargo">
        <b-form-input id="cargo"
                      type="text"
                      v-model="exp.cargo"
                      required
                      placeholder="Qual era sua função na empresa?">
        </b-form-input>
      </b-form-group>
      <b-form-group id="empresaLabel"
                    label="Empresa: *"
                    label-for="empresa">
        <b-form-input id="empresa"
                      type="text"
                      v-model="exp.empresa"
                      required
                      placeholder="Qual era o nome da empresa?">
        </b-form-input>
      </b-form-group>
      <b-form-group id="tipoLabel"
                    label="Tipo de estágio: *"
                    label-for="tipo">
        <b-form-select id="tipo"
                      :options="tipos"
                      required
                      v-model="exp.tipo">
        </b-form-select>
      </b-form-group>
      <b-form-group id="atividadesRealizadasLabel"
                    label="Atividades realizadas:"
                    label-for="atividadesRealizadas">
        <b-form-textarea id="atividadesRealizadas"
                        v-model="exp.atividadesRealizadas"
                        placeholder="Descreva suas atividades realizadas"
                        :rows="3"
                        :max-rows="6">
        </b-form-textarea>
      </b-form-group>

      <b-container>
        <b-row>
          <b-col>
            <b-form-group id="tipoPeriodo"
                          label="Semestre/Quadrimestre que foi contratado: *"
                          label-for="periodo">
              <b-form-select id="periodo"
                            :options="periodos"
                            required
                            v-model="exp.periodo">
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="duracaoLabel"
                          label="Duração (em meses):"
                          label-for="duracao">
              <b-form-input id="duracao"
                            type="number"
                            v-model="exp.duracao"
                            placeholder="Quanto tempo durou/durará seu estágio?"
                            min=1>
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group id="salarioLabel"
                          label="Salário:"
                          label-for="salario">
              <b-form-input id="salario"
                            type="number"
                            v-model="exp.salario"
                            placeholder="Qual era seu salário?"
                            min=0>
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col><h5>Benefícios:</h5></b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group id="VRVALabel"
                          label="Vale refeição/Vale alimentação:"
                          label-for="VRVA">
              <b-form-input id="VRVA"
                            type="number"
                            v-model="exp.beneficios.VRVA"
                            placeholder="Valor do VR/VA"
                            min=0>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="VTLabel"
                          label="Vale transporte:"
                          label-for="VT">
              <b-form-input id="VT"
                            type="number"
                            v-model="exp.beneficios.VT"
                            placeholder="Valor do vale transporte"
                            min=0>
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>

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
      exp: {
        cargo: '',
        empresa: '',
        tipo: null,
        atividadesRealizadas: '',
        periodo: null,
        duracao: '',
        salario: '',
        beneficios: {
          VRVA: '',
          VT: '',
        },
      },
      tipos: [
        { text: 'Selecione um', value: null },
        { text: 'Para curso semestral', value: 'semestral' },
        { text: 'Para curso quadrimestral', value: 'quadrimestral' },
        { text: 'Estágio de férias', value: 'ferias' },
        { text: 'Trainee', value: 'trainee' },
        { text: 'Outro', value: 'outro' },
      ],
      periodos: [
        { text: 'Selecione um', value: null },
        { text: '1º semestre', value: '1º semestre' },
        { text: '2º semestre', value: '2º semestre' },
        { text: '3º semestre', value: '3º semestre' },
        { text: '4º semestre', value: '4º semestre' },
        { text: '5º semestre', value: '5º semestre' },
        { text: '6º semestre', value: '6º semestre' },
        { text: '7º semestre', value: '7º semestre' },
        { text: '8º semestre', value: '8º semestre' },
        { text: '9º semestre', value: '9º semestre' },
        { text: '10º semestre', value: '10º semestre' },
        { text: '1º módulo de estágio', value: '1º modulo de estagio' },
        { text: '2º módulo de estágio', value: '2º modulo de estagio' },
        { text: '3º módulo de estágio', value: '3º modulo de estagio' },
        { text: '4º módulo de estágio', value: '4º modulo de estagio' },
        { text: 'Outro', value: 'outro' },
      ],
      error: '',
      success: '',
      show: true,
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      const result = await fetch(API_URL+'/experiencia/criar', {
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
        this.exp.empresa = '';
        this.exp.tipo = null;
        this.exp.atividadesRealizadas = '';
        this.exp.salario = '';
        this.exp.duracao = '';
        this.exp.beneficios = {
          VRVA: '',
          VT: '',
        },
        this.error = '';
        this.success = true;
      }
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our exp values */
      this.exp.cargo = '';
      this.exp.empresa = '';
      this.exp.tipo = null;
      this.exp.atividadesRealizadas = '';
      this.exp.salario = '';
      this.exp.duracao = '';
      this.exp.beneficios = {
        VRVA: '',
        VT: '',
      },
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

.form-exp {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
}
</style>
