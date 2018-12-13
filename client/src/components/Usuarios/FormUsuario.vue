<template>
  <div class="form-user">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <h3>Você parece ser novo por aqui! Crie a sua conta! ;)</h3>
      <br />
      <b-form-group id="emailLabel"
                    label="E-mail: *"
                    label-for="email">
        <b-form-input id="email"
                      type="text"
                      v-model="user.email"
                      required
                      placeholder="Seu endereço de e-mail">
        </b-form-input>
      </b-form-group>
      <b-form-group id="nomeLabel"
                    label="Nome: *"
                    label-for="nome">
        <b-form-input id="nome"
                      type="text"
                      v-model="user.nome"
                      required
                      placeholder="Como você se chama?">
        </b-form-input>
      </b-form-group>
      <b-form-group id="senhaLabel"
                    label="Senha: *"
                    label-for="senha">
        <b-form-input id="senha"
                      type="password"
                      placeholder="Digite sua senha aqui! Prometo que não vou olhar..."
                      required
                      v-model="user.senha">
        </b-form-input>
      </b-form-group>
            <b-form-group id="cursoLabel"
                    label="Curso: *"
                    label-for="curso">
        <b-form-input id="curso"
                      type="text"
                      placeholder="Qual é o seu curso?"
                      required
                      v-model="user.curso">
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="botao-form">Concluir</b-button>
      <b-button type="reset" variant="danger" class="botao-form">Limpar</b-button>
      <br />
      <br />
      <b-alert :show="!!success" variant="success">Obrigado pelo seu cadastro ^^</b-alert>
      <b-alert :show="!!error" variant="warning">{{error}}</b-alert>
    </b-form>
  </div>
</template>

<script>
const API_URL = process.env.API_URL || 'http://localhost:3000';

export default {
  data() {
    return {
      user: {
        email: '',
        nome: '',
        senha: '',
        curso: '',
      },
      error: '',
      success: '',
      show: true,
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      const result = await fetch(API_URL+'/usuarios/criar', {
        method: 'POST',
        body: JSON.stringify(this.user),
        headers: {
          'content-type': 'application/json',
        },
      });
      const resultJSON = await result.json();
      if (resultJSON.erro) {
        this.error = resultJSON.mensagem;
        this.success = '';
      } else {
        this.user.email = '';
        this.user.nome = '';
        this.user.senha = '';
        this.user.curso = '';
        this.error = '';
        this.success = true;
        const rota = '/';
        this.$router.push({ path: rota });
      }
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our user values */
      this.user.email = '';
      this.user.nome = '';
      this.user.senha = '';
      this.user.curso = '';
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

.form-user {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
}
</style>
