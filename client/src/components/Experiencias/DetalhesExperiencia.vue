<template>
  <div class="form-exp">
    <h3>{{exp.cargo}} - {{exp.empresa}}</h3>
    <hr />
    <p>
      <b>Atividades realizadas:</b> {{exp.atividadesRealizadas}}
    </p>
    <b-container>
      <b-row>
        <b-col>
          <b>Tipo de estágio:</b> {{exp.tipo}}
        </b-col>
        <b-col>
          <b>Período que foi contratado:</b> {{exp.periodoContratado}}
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b>Tempo de estágio:</b> {{exp.duracao}} meses
        </b-col>
        <b-col>
          <b>Data de entrada:</b> {{exp.dataEntrada}}
        </b-col>
      </b-row>
    </b-container>
    <br />
    <h5>Benefícios:</h5>
    <b-container>
      <b-row>
        <b-col>
          <b>Salário:</b> {{exp.salario}} reais
        </b-col>
        <b-col>
          <b>Vale alimentação/refeição:</b> {{exp.beneficios.VRVA}}
        </b-col>
        <b-col>
          <b>Vale transporte:</b> {{exp.beneficios.VT}}
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
        dataEntrada: '2012-12-12',
        salario: 2114,
        beneficios: {
          VRVA: 100,
          VT: 50,
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
