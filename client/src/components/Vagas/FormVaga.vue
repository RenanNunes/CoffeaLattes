<template>
  <div class="form-vaga">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <h3>Divulgue sua vaga!</h3>
      <br />
      <b-form-group id="cargoLabel"
                    label="Cargo: *"
                    label-for="cargo">
        <b-form-input id="cargo"
                      type="text"
                      v-model="vaga.cargo"
                      required
                      placeholder="Qual será a função na empresa?">
        </b-form-input>
      </b-form-group>
      <b-form-group id="empresaLabel"
                    label="Empresa: *"
                    label-for="empresa">
        <b-form-input id="empresa"
                      type="text"
                      v-model="vaga.empresa"
                      required
                      placeholder="Qual é o nome da empresa?">
        </b-form-input>
      </b-form-group>
      <b-form-group id="tipoLabel"
                    label="Tipo de estágio: *"
                    label-for="tipo">
        <b-form-select id="tipo"
                      :options="tipos"
                      required
                      v-model="vaga.tipo">
        </b-form-select>
      </b-form-group>
      <b-form-group id="descricaoLabel"
                    label="Descrição: *"
                    label-for="descricao">
        <b-form-textarea id="descricao"
                        v-model="vaga.descricao"
                        placeholder="Descreva a vaga"
                        required
                        :rows="3"
                        :max-rows="6">
        </b-form-textarea>
      </b-form-group>

      <b-container>
        <b-row>
          <b-col>
            <b-form-group id="dataLimiteLabel"
                          label="Data máxima de inscrição para a vaga: *"
                          label-for="dataLimite">
              <b-form-input id="dataLimite"
                            type="date"
                            v-model="vaga.dataLimite"
                            required
                            placeholder="Até quando a vaga é válida?">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="salarioLabel"
                          label="Salário:"
                          label-for="salario">
              <b-form-input id="salario"
                            type="number"
                            v-model="vaga.salario"
                            placeholder="Qual será o salário?"
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
                            v-model="vaga.beneficios.VRVA"
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
                            v-model="vaga.beneficios.VT"
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
      <b-alert :show="!!success" variant="success">Vaga criada com sucesso!</b-alert>
      <b-alert :show="!!error" variant="warning">{{error}}</b-alert>
    </b-form>
  </div>
</template>

<script>
const API_URL = process.env.API_URL || 'http://localhost:3000';

export default {
  data() {
    return {
      vaga: {
        cargo: '',
        empresa: '',
        tipo: null,
        descricao: '',
        dataLimite: '',
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
      error: '',
      success: '',
      show: true,
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      const result = await fetch(API_URL+'/vagas/criar', {
        method: 'POST',
        body: JSON.stringify(this.vaga),
        headers: {
          'content-type': 'application/json',
        },
      });
      const resultJSON = await result.json();
      if (resultJSON.erro) {
        this.error = resultJSON.mensagem;
        this.success = '';
      } else {
        this.vaga.cargo = '';
        this.vaga.empresa = '';
        this.vaga.tipo = null;
        this.vaga.descricao = '';
        this.vaga.dataLimite = '';
        this.vaga.salario = '';
        this.vaga.beneficios = {
          VRVA: '',
          VT: '',
        },
        this.error = '';
        this.success = true;
      }
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our vaga values */
      this.vaga.cargo = '';
      this.vaga.empresa = '';
      this.vaga.tipo = null;
      this.vaga.descricao = '';
      this.vaga.dataLimite = '';
      this.vaga.salario = '';
      this.vaga.beneficios = {
        VRVA: '',
        VT: '',
      },
      this.error = '';
      this.success = '';
      /* Trick to reset/clear native browser vaga validation state */
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

.form-vaga {
  background-color: #fcfcfc;
  padding: 15px;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
}
</style>
