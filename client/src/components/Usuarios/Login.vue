<template>
  <div class="form-user">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <h3>Login</h3>
      <br />
      <b-form-group id="emailLabel"
                    label="E-mail: *"
                    label-for="email">
        <b-form-input id="email"
                      type="text"
                      v-model="user.email"
                      required
                      placeholder="Digite seu e-mail aqui!">
        </b-form-input>
      </b-form-group>
      <b-form-group id="senhaLabel"
                    label="Senha: *"
                    label-for="senha">
        <b-form-input id="senha"
                      type="password"
                      placeholder="Digite sua senha aqui!"
                      required
                      v-model="user.senha">
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="botao-form">Login</b-button>
      <b-button type="reset" variant="danger" class="botao-form">Limpar</b-button>
      <br />
      <br />
      <b-alert :show="!!success" variant="success">Voc� est� logado ^^</b-alert>
      <b-alert :show="!!error" variant="warning">{{error}}</b-alert>
    </b-form>
  </div>
</template>

<script>
  import App from '@/App.vue';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export default {
  data() {
    return {
      user: {
        email: '',
        senha: '',
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
      const result = await fetch(API_URL+'/login', {
        method: 'POST',
        body: JSON.stringify(this.user),
        headers: {
          'content-type': 'application/json',
        },
      });
      const resultJSON = await result.json();
      if (resultJSON == null || resultJSON['error']) {
        this.error = resultJSON['error'] || "Algo deu errado";
        this.success = '';
      } else {
        this.user.email = '';
        this.user.senha = '';
        this.error = '';
        this.success = true;
        this.$setCookie('user', resultJSON['_id'], { expires: 7 });
        this.$setCookie('token', resultJSON['token'], { expires: 7 });
        const rota = '/usuario/detalhar';
        this.$router.push({ path: rota });
      }
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our user values */
      this.user.email = '';
      this.user.senha = '';
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
  background-color: #fcfcfc;
  padding: 15px;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
}
</style>
