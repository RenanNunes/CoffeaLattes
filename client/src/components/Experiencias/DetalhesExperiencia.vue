<template>
  <div class="form-exp">
    <h3>{{exp.cargo}} - {{exp.empresa}}</h3>
    <hr />
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
          <span v-if="exp.beneficios.VRVA">{{exp.beneficios.VRVA}}</span>
          <span v-else>Não informado</span>
        </b-col>
        <b-col>
          <b>Vale transporte:</b>{{' '}}
          <span v-if="exp.beneficios.VT">{{exp.beneficios.VT}}</span>
          <span v-else>Não informado</span>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
const API_URL = process.env.API_URL || 'http://localhost:3000';

//utils com função para deixar apenas a primeira letra maiuscula(?)
export default {
  data() {
    return {
      exp: {
        cargo: 'trainee',
        empresa: 'olá',
        tipo: 'semestral',
        atividadesRealizadas: 'Realizava altas reuniões com um bocado de gente daora e importante. Sempre com clima descontraído e linguagem coloquial',
        periodoContratado: '1º modulo de estagio',
        duracao: 4,
        dataEntrada: '12/12/2012',
        salario: 0,
        beneficios: {
          VRVA: 0,
          VT: 0,
        },
      },
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
