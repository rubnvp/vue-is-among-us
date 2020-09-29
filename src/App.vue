<template>
  <div class="app">
    <header class="main-header">
      Vue - Pokedex
    </header>
    <characters-view />
  </div>
</template>

<script>
import CharactersView from './pages/CharactersView.vue'

export default {
  name: 'App',
  components: {
    CharactersView,
  }
}
</script>

<style lang="scss">
@import './assets/main.scss';

.app {
  .main-header {
    text-transform: uppercase;
    background: #42b883;
    color: white;
    font-size: 35px;
    padding: 0.5em;
    font-weight: 400;
  }
}
</style>
