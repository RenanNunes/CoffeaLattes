<template>
  <div class="form-user" v-if="user">
    <h3 v-if="user.nome">{{user.nome}}</h3>
    <h3 v-else-if="user.erro">Ocorreu um erro ao buscar o usuario</h3>
    <h3 v-else>Buscando...</h3>
    <hr />
    <div v-if="user.erro">
      <router-link to="/">Voltar para a pagina inicial</router-link>
    </div>
    <div v-else>
      <p>
        <b>Email: </b> {{user.email}}
      </p>
      <p>
        <b>Curso: </b> {{user.curso}}
      </p>
      <p>
        <b>Data de Criação: </b> {{user.dataCriacao}}
      </p>
      <hr />
      <b-button @click="showModal" variant="danger" class="botao-form">Apagar</b-button>
      <b-modal ref="myModalRef" hide-footer title="Apagar">
        <div class="d-block text-center">
          <h4>Tem certeza que deseja apagar o usuario?</h4>
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
      user: {
        type: Object,
        required: true,
      }
  },
  methods: {
    showModal () {
      this.$refs.myModalRef.show()
    },
    apagar() {
      const id = this.user && this.user._id;
      fetch(API_URL + '/usuarios/remover?id=' + id, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      }).then(() => this.$router.push({ path: '/' }));
    },
  }
}
</script>

<style scoped>
.botao-form {
  margin: 4px;
}

.form-user {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
}

.col{
  padding-left: 0px;
}
</style>
