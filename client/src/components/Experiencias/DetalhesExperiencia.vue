<template>
  <div class="form-exp" v-if="exp">
    <h3 v-if="exp.cargo">{{exp.cargo}} - {{exp.empresa}}</h3>
    <h3 v-else-if="exp.erro">Ocorreu um erro ao buscar a experiência =/</h3>
    <h3 v-else>Buscando...</h3>
    <hr />
    <div v-if="exp.erro">
      <router-link to="/experiencias/listar">Voltar para a lista</router-link>
    </div>
    <div v-else>
      <p>
        <b>Atividades realizadas:</b> {{exp.atividadesRealizadas}}
      </p>
      <b-container>
        <b-row>
          <b-col v-if="exp.tipo">
            <b>Tipo de estágio:</b> {{exp.tipo.substr(0,1).toUpperCase()}}{{exp.tipo.substr(1)}}
          </b-col>
          <b-col v-if="exp.periodoContratado">
            <b>Período que foi contratado:</b> {{exp.periodoContratado.replace('modulo', 'módulo').replace('estagio', 'estágio')}}
          </b-col>
        </b-row>
        <b-row>
          <b-col v-if="exp.dataEntrada">
            <b>Data de entrada:</b> {{exp.dataEntrada}}
          </b-col>
          <b-col v-if="exp.duracao">
            <b>Tempo de estágio:</b> {{exp.duracao}} meses
          </b-col>
        </b-row>
      </b-container>
      <br />
      <h5>Benefícios:</h5>
      <b-container>
        <b-row>
          <b-col>
            <b>Salário:</b>{{' '}}
            <span v-if="exp.salario">{{exp.salario}} reais</span>
            <span v-else>Não informado</span>
          </b-col>
          <b-col>
            <b>Vale alimentação/refeição:</b>{{' '}}
            <span v-if="exp.beneficios && exp.beneficios.VRVA">{{exp.beneficios.VRVA}}</span>
            <span v-else>Não informado</span>
          </b-col>
          <b-col>
            <b>Vale transporte:</b>{{' '}}
            <span v-if="exp.beneficios && exp.beneficios.VT">{{exp.beneficios.VT}}</span>
            <span v-else>Não informado</span>
          </b-col>
        </b-row>
      </b-container>
      <hr />
      <b-button @click="showModal" variant="danger" class="botao-form">Apagar</b-button>
      <b-modal ref="myModalRef" hide-footer title="Apagar">
        <div class="d-block text-center">
          <h4>Tem certeza que deseja apagar a experiência?</h4>
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
      exp: {
        type: Object,
        required: true,
      }
  },
  methods: {
    showModal () {
      this.$refs.myModalRef.show()
    },
    apagar() {
      const id = this.exp && this.exp._id;
      fetch(API_URL + '/experiencia/apagar?id=' + id, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      }).then(() => this.$router.push({ name: 'listarExperiencias' }));
    }
  }
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

.col{
  padding-left: 0px;
}
</style>
