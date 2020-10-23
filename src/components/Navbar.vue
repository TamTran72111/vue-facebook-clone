<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img class="logo" src="../assets/logo.png" />
      </router-link>
      <input class="input is-rounded mt-2" type="text" placeholder="Search" />
      <a class="navbar-burger burger">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link title="Home" to="/" class="navbar-item mx-3">
          <span class="icon is-medium">
            <i class="fas fa-home fa-2x"></i>
          </span>
        </router-link>

        <router-link title="Friends" to="/" class="navbar-item mx-3">
          <span class="icon is-medium">
            <i class="fas fa-user-friends fa-2x"></i>
          </span>
        </router-link>

        <router-link title="Watch" to="/" class="navbar-item mx-3">
          <span class="icon is-medium">
            <i class="fab fa-youtube fa-2x"></i>
          </span>
        </router-link>

        <router-link title="Marketplace" to="/" class="navbar-item mx-3">
          <span class="icon is-medium">
            <i class="fas fa-store fa-2x"></i>
          </span>
        </router-link>

        <router-link title="Groups" to="/" class="navbar-item mx-3">
          <span class="icon is-medium">
            <i class="fas fa-users fa-2x"></i>
          </span>
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Logout</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
img.logo {
  max-width: 2rem;
  max-height: 2rem;
  border: none;
  border-radius: 50% !important;
  padding: 0;
}
.navbar-start {
  margin: auto;
}
</style>