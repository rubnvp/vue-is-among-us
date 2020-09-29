<template>
  <div class="app">
    <header class="main-header">
      Vue is
      <img class="image-header" src="/images/among-us.jpg" alt="among us">
    </header>
    <crewmates-view />
  </div>
</template>

<script>
import CrewmatesView from './pages/CrewmatesView.vue'

export default {
  name: 'App',
  components: {
    CrewmatesView,
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
