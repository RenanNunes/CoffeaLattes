<template>
  <div class="form-emp" v-if="emp">
    <h3 v-if="emp.nome">{{emp.nome}}</h3>
    <h3 v-else-if="emp.erro">Ocorreu um erro ao buscar a empresa</h3>
    <h3 v-else>Buscando...</h3>
    <hr />
    <div v-if="emp.erro">
      <router-link to="/empresas/listar">Voltar para a lista</router-link>
    </div>
    <div v-else>
      <p>
        <b>Descrição: </b> {{emp.descricao}}
      </p>
      <p>
            <b>Locais da empresa:</b> {{emp.localidades}}
          </p>
        <p v-if="emp.areaDeAtuacao">
            <b>Área de atuação:</b> {{emp.areaDeAtuacao}}
        </p>
        <p>
            <b>Site:</b>
            <a :href="`#${emp.site}`">
                {{emp.site}}
            </a>
        </p>
      <hr />
      <b-button @click="showModal" variant="danger" class="botao-form">Apagar</b-button>
      <b-modal ref="myModalRef" hide-footer title="Apagar">
        <div class="d-block text-center">
          <h4>Tem certeza que deseja apagar a empresa?</h4>
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
      emp: {
        type: Object,
        required: true,
      }
  },
  methods: {
    showModal () {
      this.$refs.myModalRef.show()
    },
    apagar() {
      const id = this.emp && this.emp._id;
      fetch(API_URL + '/empresa/remover?_id=' + id, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      }).then(() => this.$router.push({ path: '/empresas/listar' }));
    },
  }
}
</script>

<style scoped>
.botao-form {
  margin: 4px;
}

.form-emp {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
}

.col{
  padding-left: 0px;
}
</style>
