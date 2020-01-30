<template>
  <div id="app">

    <b-navbar toggleable="md" type="dark" variant="secondary">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">CoffeaLattes</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item to="#">Sobre</b-nav-item>
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>Estágios</em>
            </template>
            <b-dropdown-item to="/experiencias/criar">Adicionar</b-dropdown-item>
            <b-dropdown-item to="/experiencias/listar/busca">Buscar</b-dropdown-item>
            <b-dropdown-item to="/experiencias/listar">Listar todos</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>Empresas</em>
            </template>
            <b-dropdown-item to="/empresas/criar">Adicionar</b-dropdown-item>
            <b-dropdown-item to="/empresas/listar">Listar todas</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>Vagas</em>
            </template>
            <b-dropdown-item to="/vagas/criar">Adicionar</b-dropdown-item>
            <b-dropdown-item to="/vagas/listar">Listar todos</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="#">Fale conosco</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!this.$cookies.user" right to="/signup">Cadastre-se</b-nav-item>
          <b-nav-item v-if="!this.$cookies.user" right to="/login">Login</b-nav-item>

          <b-nav-item-dropdown v-if="this.$cookies.user" right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>Conta</em>
            </template>
            <b-dropdown-item to="/usuario/detalhar">Perfil</b-dropdown-item>
            <b-dropdown-item to="/logout">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <router-view/>
  </div>
</template>

<style>
</style>
