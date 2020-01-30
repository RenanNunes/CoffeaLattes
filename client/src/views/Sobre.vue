<template>
  <div class="home">
    <b-container class="form-margin-sobre">

    <div>
      <b-card>
        <b-media no-body>
          <b-media-aside vertical-align="center">
            <b-img src="https://media.giphy.com/media/tQ8uT9t0uK92M/giphy.gif" width="250" alt="coffee and dog"></b-img>
          </b-media-aside>

          <b-media-body class="ml-3">
            <h5 class="mt-0">O site</h5>
            <p>
              Foi criado por alunos da Engenharia de Computação da Escola Politécnica da USP (Poli) com dois principais objetivos: aprender sobre algumas tecnologias de desenvolvimento web (no caso, foram utilizados Vue.js, MongoDB e Node.js); facilitar a troca de experiências entre estágios, principalmente, nos casos de estágios quadrimestrais (modelo do curso de Engenharia de Computação e Engenharia Química da Poli).
            </p>
          </b-media-body>
        </b-media>
      </b-card>
    </div>
    <br/>

    <div>
      <b-card>
        <b-media no-body>
          <b-media-body>
            <h5 class="mt-0">Como foi a experiência?</h5>
            <p>
              Bem, mais fácil explicar com o gif ao lado hahaha. Ou seja, foi um experiência que parecia simples no começo, mas que surgiram vários obstáculos (aulas, estágios, provas, intercâmbio, entrada/saída de pessoas, etc), e que, no final, conseguimos nos aventurar nessa "perigosa" do desenvolvimento. De forma resumida, o resultado do projetinho foi esta plataforma e mais aprendizados <span style="text-decoration: line-through;">bons e ruins hehe</span> para os membros =)
            </p>
          </b-media-body>

          <b-media-aside vertical-align="center" class="ml-3">
            <b-img src="https://media.giphy.com/media/sYPuRkZZlS8eY/giphy.gif" width="130" alt="dog running"></b-img>
          </b-media-aside>
        </b-media>
      </b-card>
    </div>
    <br/>

    <div>
      <b-card>
        <b-media no-body>
          <b-media-aside vertical-align="center">
            <b-img src="https://media.giphy.com/media/3ohhwzCKbM4lLImCVG/giphy.gif" width="250" alt="coffee dog"></b-img>
          </b-media-aside>

          <b-media-body class="ml-3">
            <h5 class="mt-0">Por que CoffeaLattes?</h5>
            <p>
              Gostamos muito de trocadilhos, então resolvemos fazer um jogo de palavras para o nome. Primeiro, pensamos numa coisa que remete muito a estágio: café. Traduzimos para outra língua:"Coffea" significa "Cafés" em latim <span style="text-decoration: line-through;">e tem FEA no nome</span>. Já o "Lattes", que lembra "café latte", vem da "Plataforma Lattes".
            </p>
          </b-media-body>
        </b-media>
      </b-card>
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

.card {
  border-right: 0px !important;
  border-left: 0px !important;
}
</style>