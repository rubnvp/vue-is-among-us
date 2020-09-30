<template>
  <div class="app">
    <header class="main-header">
      Vue 2 is
      <img class="image-header" src="/images/among-us.jpg" alt="among us">
      ...
    </header>
    <players-view />
  </div>
</template>

<script>
import PlayersView from './pages/PlayersView.vue'

export default {
  name: 'App',
  components: {
    PlayersView,
  }
}
</script>

<style lang="scss">
@import './assets/main.scss';
.app {
  .main-header {
    font-family: 'Amatic SC', sans-serif;
    font-weight: 700;
    font-size: 45px;
    text-transform: uppercase;
    background: #000;
    color: white;
    padding: 0.5em;
    display: flex;
    align-items: center;
    word-spacing: 10px;
  }
  .image-header {
    height: 50px;
    margin-left: 10px;
  }
}
</style>
