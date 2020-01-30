<template>
  <div class="home">
    <b-container class="form-margin-sobre">
      
      <div>
        <b-media right-align vertical-align="center">
          <template v-slot:aside>
            <b-img src="https://media.giphy.com/media/3ohhwzCKbM4lLImCVG/giphy.gif" width="270" alt="coffee and dog"></b-img>
          </template>
          <h5 class="mt-0 mb-1">O site</h5>
          <p class="mb-0">Foi criado por alunos da Engenharia de Computação da Escola Politécnica da USP (Poli) com dois principais objetivos: aprender sobre algumas tecnologias de desenvolvimento web (no caso, foram utilizados Vue.js, MongoDB e Node.js); facilitar a troca de experiências entre estágios, principalmente, nos casos de estágios quadrimestrais (modelo do curso de Engenharia de Computação e Engenharia Química da Poli).
          </p>
        </b-media>
      </div>
      <br/>

      <div>
        <b-media vertical-align="center">
          <template v-slot:aside>
            <b-img src="https://media.giphy.com/media/tQ8uT9t0uK92M/giphy.gif" width="270" alt="coffee dog"></b-img>
          </template>
          <h5 class="mt-0 mb-1">Por que CoffeaLattes?</h5>
          <p class="mb-0">Gostamos muito de trocadilhos, então resolvemos fazer um jogo de palavras para o nome. Primeiro, pensamos numa coisa que remete muito a estágio: café. Traduzimos para outra língua:"Coffea" significa "Cafés" em latim <span style="text-decoration: line-through;">e tem FEA no nome</span>. Já o "Lattes", que lembra "café latte", vem da "Plataforma Lattes".
          </p>
        </b-media>
      </div>
      <br/>

      <div>
        <b-media right-align vertical-align="center">
          <template v-slot:aside>
            <b-img src="https://media.giphy.com/media/sYPuRkZZlS8eY/giphy.gif" width="150" alt="dog running"></b-img>
          </template>
          <h5 class="mt-0 mb-1">Como foi a experiência?</h5>
          <p class="mb-0">Bem, mais fácil explicar com o gif ao lado hahaha. Ou seja, foi um experiência que parecia simples no começo, mas que surgiram vários obstáculos (Poli, estágios, provas, intercâmbio, entrada/saída de pessoas, etc). No final, o resultado foi esta plataforma e mais aprendizados para os membros <span style="text-decoration: line-through;">bons e ruins hehe</span> =)
          </p>
        </b-media>
      </div>
      <br/>

	</b-container>
  </div>
</template>

<script>
export default {
  name: 'sobre',
  components: {
  },
};
</script>
<style>
.form-margin-sobre {
  margin-top: 20px;
}

p {
  text-align: justify;
}
</style>