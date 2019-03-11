import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import CriarExperiencia from './views/CriarExperiencia.vue';
import ListarExperiencia from './views/ListarExperiencia.vue';
import CriarReview from './views/CriarReview.vue';
import DetalharExperiencia from './views/DetalharExperiencia.vue';
import CriarVaga from './views/CriarVaga.vue';
import ListarVaga from './views/ListarVaga.vue';
import Erro404 from './views/Erro404.vue';
import CriarEmpresa from './views/CriarEmpresa.vue';
import ListarEmpresa from './views/ListarEmpresa.vue';
import DetalharEmpresa from './views/DetalharEmpresa.vue';
import CriarUsuario from './views/CriarUsuario.vue';
import LoginUsuario from './views/LoginUsuario.vue';
import LogoutUsuario from './views/LogoutUsuario.vue';
import DetalharUsuario from './views/DetalharUsuario.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/experiencias/criar',
      name: 'novaExperiencia',
      component: CriarExperiencia,
    },
    {
      path: '/experiencias/listar/:buscar?',
      name: 'listarExperiencias',
      component: ListarExperiencia,
    },
    {
      path: '/reviews/criar/:exp/:emp',
      name: 'criarReview',
      component: CriarReview,
    },
    {
      path: '/experiencia/detalhar/:id',
      name: 'detalharExperiencia',
      component: DetalharExperiencia,
    },
    {
      path: '/vagas/criar',
      name: 'novaVaga',
      component: CriarVaga,
    },
    {
      path: '/vagas/listar',
      name: 'listarVaga',
      component: ListarVaga,
    },
    {
      path: '/empresas/criar',
      name: 'criarEmpresa',
      component: CriarEmpresa,
    },
    {
      path: '/empresas/listar',
      name: 'listarEmpresa',
      component: ListarEmpresa,
    },
    {
      path: '/empresas/detalhar/:id',
      name: 'detalharEmpresa',
      component: DetalharEmpresa,
    },
    {
      path: '/signup',
      name: 'criarUsuario',
      component: CriarUsuario,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginUsuario,
    },
    {
    path: '/logout',
        name: 'logout',
    component: LogoutUsuario,	  
    },
    {
      path: '/usuario/detalhar',
      name: 'detalharUsuario',
      component: DetalharUsuario,
    },
    {
      path: '*',
      name: 'notFound',
      component: Erro404,
    },
  ],
});
