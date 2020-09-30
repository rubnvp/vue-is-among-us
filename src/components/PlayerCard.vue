<template>
  <div class="player-card">
    <div class="background-wrapper">
      <div :style="{'background-color': backgroundColor}" />
    </div>
    <span class="remove-player" @click="remove">
      <i class="material-icons">close</i>
    </span>
    <div class="image-wrapper">
      <img class="player-image" :src="player.image" :alt="player.name" />
    </div>
    <div class="player-title">{{ player.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    player: Object,
    backgroundColor: {
      type: String,
      default: '#000',
    }
  },
  methods: {
    remove() {
      this.$emit("remove", this.player);
    }
  }
};
</script>

<style lang="scss">
/* Player card */
.player-card {
  margin: 5px;
  position: relative;
  height: 170px;
  width: 170px;
  display: flex;
  flex-direction: column;
  text-align: center;
  color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  .background-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: -1;
  }

  .background-wrapper div {
    flex-grow: 1;
  }

  .remove-player {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  &:hover .remove-player {
    display: inline-block;
  }

  .remove-player:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .image-wrapper {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .player-image {
    height: 110px;
    border-radius: 50%;
    border: 4px solid black;
  }

  .player-title {
    height: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
