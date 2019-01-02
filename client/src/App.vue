<template>
  <div id="app">

    <b-navbar toggleable="md" type="dark" variant="secondary">
     <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/">CoffeaLattes</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item href="#">Sobre</b-nav-item>
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>Estágios</em>
            </template>
            <b-dropdown-item href="/experiencias/criar">Adicionar</b-dropdown-item>
            <b-dropdown-item href="/experiencias/listar/busca">Buscar</b-dropdown-item>
            <b-dropdown-item href="/experiencias/listar">Listar todos</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>Empresas</em>
            </template>
            <b-dropdown-item href="/empresas/criar">Adicionar</b-dropdown-item>
            <b-dropdown-item href="/empresas/listar">Listar todas</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>Vagas</em>
            </template>
            <b-dropdown-item href="/vagas/criar">Adicionar</b-dropdown-item>
            <b-dropdown-item href="/vagas/listar">Listar todos</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item href="#">Fale conosco</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item right href="/signup">Cadastre-se</b-nav-item>
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            
            <template slot="button-content">
              <em>Conta</em>
            </template>
            <b-dropdown-item href="/login">Login</b-dropdown-item>
            <b-dropdown-item href="/usuario/detalhar">Perfil</b-dropdown-item>
            <b-dropdown-item href="/logout">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <router-view/>
  </div>
</template>

<style>
</style>
