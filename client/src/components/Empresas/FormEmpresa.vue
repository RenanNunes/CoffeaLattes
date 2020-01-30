<template>
  <div class="form-emp">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <h3> Por favor, preencha os dados da nova empresa abaixo:</h3>
      <br />
      <b-form-group id="nomeLabel"
                    label="Nome: *"
                    label-for="nome">
        <b-form-input id="nome"
                      type="text"
                      v-model="emp.nome"
                      required
                      placeholder="Qual é o nome da empresa?">
        </b-form-input>
      </b-form-group>
      
      
      <b-form-group id="localidadesLabel"
                    label="Localidades:"
                    label-for="localidades">
        <b-form-textarea id="localidades"
                        v-model="emp.localidades"
                        placeholder="Onde a empresa fica? Use novas linhas para adicionar novos locais"
                        :rows="3"
                        :max-rows="6">
        </b-form-textarea>
      </b-form-group>

      <b-form-group id="areaDeAtuacaoLabel"
                    label="Área de atuação da empresa:"
                    label-for="areaDeAtuacao">
        <b-form-input id="areaDeAtuacao"
                      type="text"
                      v-model="emp.areaDeAtuacao"
                      placeholder="Qual é a área de atuação da empresa?">
        </b-form-input>
      </b-form-group>

      <b-form-group id="descricao"
                    label="Descrição da empresa:"
                    label-for="descricao">
        <b-form-input id="descricao"
                      type="text"
                      v-model="emp.descricao"
                      placeholder="Forneça uma descrição mais detalhada sobre a empresa: O que ela faz? Quando foi fundada? Quais são os seus objetivos?">
        </b-form-input>
      </b-form-group>

      <b-form-group id="site"
                    label="Site da empresa:"
                    label-for="site">
        <b-form-input id="site"
                      type="text"
                      v-model="emp.site"
                      placeholder="Ex.: www.exemplo.com.br">
        </b-form-input>
      </b-form-group>


      <b-button type="submit" variant="primary" class="botao-form">Concluir</b-button>
      <b-button type="reset" variant="danger" class="botao-form">Limpar</b-button>
      <br />
      <br />
      <b-alert :show="!!success" variant="success">Empresa criada com sucesso!</b-alert>
      <b-alert :show="!!error" variant="warning">{{error}}</b-alert>
    </b-form>
  </div>
</template>

<script>
const API_URL = process.env.API_URL || 'http://localhost:3000';

export default {
  data() {
    return {
      emp: {
        nome: '',
        localidades: '',
        areaDeAtuacao: '',
        descricao: '',
        site: '',
        notasMedias: {
          ambiente: '',
          aprendizado: '',
          autonomia: ''
        },
      },
      error: '',
      success: '',
      show: true,
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      this.error = '';
      const auxLocalidades = this.emp.localidades;
      this.emp.localidades = this.emp.localidades.split(/\r?\n/);
        const result = await fetch(API_URL+'/empresas', {
        method: 'POST',
        body: JSON.stringify(this.emp),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resultJSON = await result.json();
      if (resultJSON.erro) {
        this.emp.localidades = auxLocalidades;
        this.error = resultJSON.mensagem;
        this.success = '';
      } else {
      
       this.emp.nome = '';
        this.emp.localidades = '';
        this.emp.areaDeAtuacao = '';
        this.emp.descricao = '';
        this.emp.site = '';
        this.emp.notasMedias = {
          ambiente: '',
          aprendizado: '',
          autonomia: ''
        };
        this.error = '';
        this.success = true;
       const rota = '/empresas/listar';
        this.$router.push({ path: rota });
      }
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our emp values */
      this.emp.nome = '';
      this.emp.localidades = '';
      this.emp.areaDeAtuacao = '';
      this.emp.descricao = '';
      this.emp.site = '';
      this.emp.notasMedias = {
        ambiente: '',
        aprendizado: '',
        autonomia: ''
      };
      this.error = '';
      this.success = '';
      /* Trick to reset/clear native browser emp validation state */
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

.form-emp {
  background-color: #fcfcfc;
  padding: 15px;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
}
</style>
