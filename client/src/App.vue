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
              <em>Experiências</em>
            </template>
            <b-dropdown-item href="/experiencias/criar">Adicionar</b-dropdown-item>
            <b-dropdown-item href="/experiencias/listar">Buscar</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item href="#">Fale conosco</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>Conta</em>
            </template>
            <b-dropdown-item href="#">Perfil</b-dropdown-item>
            <b-dropdown-item href="#">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <router-view/>
  </div>
</template>

<style>
</style>
