<template>
  <div class="form-exp">
    <h3 v-if="exp && exp.cargo">{{exp.cargo}} - {{exp.empresa}}</h3>
    <h3 v-else-if="exp.erro">Ocorreu um erro ao buscar a Experiência</h3>
    <h3 v-else>Buscando...</h3>
    <hr />
    <p>
      <b v-if="exp">Atividades realizadas:</b> {{exp.atividadesRealizadas}}
    </p>
    <b-container>
      <b-row>
        <b-col v-if="exp && exp.tipo">
          <b>Tipo de estágio:</b> {{exp.tipo.substr(0,1).toUpperCase()}}{{exp.tipo.substr(1)}}
        </b-col>
        <b-col v-if="exp && exp.periodoContratado">
          <b>Período que foi contratado:</b> {{exp.periodoContratado.replace('modulo', 'módulo').replace('estagio', 'estágio')}}
        </b-col>
      </b-row>
      <b-row>
        <b-col v-if="exp && exp.dataEntrada">
          <b>Data de entrada:</b> {{exp.dataEntrada}}
        </b-col>
        <b-col v-if="exp && exp.duracao">
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
          <span v-if="exp && exp.salario">{{exp.salario}} reais</span>
          <span v-else>Não informado</span>
        </b-col>
        <b-col>
          <b>Vale alimentação/refeição:</b>{{' '}}
          <span v-if="exp && exp.beneficios && exp.beneficios.VRVA">{{exp.beneficios.VRVA}}</span>
          <span v-else>Não informado</span>
        </b-col>
        <b-col>
          <b>Vale transporte:</b>{{' '}}
          <span v-if="exp && exp.beneficios && exp.beneficios.VT">{{exp.beneficios.VT}}</span>
          <span v-else>Não informado</span>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
// utils com função para deixar apenas a primeira letra maiuscula(?)
export default {
  props: {
      exp: {
        type: Object,
        required: true,
      }
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

.col{
  padding-left: 0px;
}
</style>
