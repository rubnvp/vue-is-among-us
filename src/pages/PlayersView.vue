<template>
  <div class="characters-view">
    <!-- Player Filters -->
    <aside class="player-filters">
      <!-- Searchbox -->
      <nice-input v-model="searchText" placeholder="Search by name" />
      <!-- Checkboxes -->
      <p class="checkboxes-list-title">Hat</p>
      <div class="checkboxes-list">
        <nice-checkbox
          v-model="selectedHats"
          :value="false"
          label="🚫 No hat"
        />
        <nice-checkbox
          v-model="selectedHats"
          :value="true"
          label="🧢 With hat"
        />
      </div>
      <p class="checkboxes-list-title">Color</p>
      <div class="checkboxes-list">
        <nice-checkbox
          v-for="(rgb, color) in COLOR_RGB" :key="color"
          v-model="selectedColors"
          :value="color"
          :color="rgb"
          :label="color"
        />
      </div>
    </aside>

    <!-- Players list -->
    <main class="main-view">
      <transition-group name="bounce" tag="article" class="players-list">
        <!-- Player Card -->
        <player-card
          v-for="player in filteredPlayers"
          :key="player.name"
          :player="player"
          :background-color="COLOR_RGB[player.color]"
          @remove="removePlayer"
        ></player-card>
      </transition-group>
    </main>
  </div>
</template>

<script setup>
import {ref, computed, readonly} from 'vue';

import {COLOR_RGB as CONST_COLOR_RGB} from "@/common/constants";
import {useSearchText, useSelectedHats, useSelectedColors} from '@/common/useFilters';

import NiceInput from '@/components/NiceInput.vue';
import NiceCheckbox from '@/components/NiceCheckbox.vue';
import PlayerCard from '@/components/PlayerCard.vue';

export default {
  name: 'CharactersView',
  components: {
    NiceInput,
    NiceCheckbox,
    PlayerCard,
  },
};

export const COLOR_RGB = readonly(CONST_COLOR_RGB);

const {searchText, filterBySearchText} = useSearchText();
const {selectedHats, filterBySelectedHats} = useSelectedHats();
const {selectedColors, filterBySelectedColors} = useSelectedColors();
export {searchText, selectedHats, selectedColors};

export const players = ref([]);

export const filteredPlayers = computed(() => {
  return players.value
    .filter(filterBySearchText)
    .filter(filterBySelectedHats)
    .filter(filterBySelectedColors);
});

export function removePlayer(playerToDelete) {
  players.value = players.value
    .filter(player => player !== playerToDelete);
}

fetch('/players.json')
  .then(response => response.json())
  .then(playersList => {
    players.value = playersList;
  });
</script>

<style lang="scss">
.characters-view {
  display: flex;
  flex: 1;

  .main-view {
    overflow-y: auto;
    height: calc(100vh - 102px);
  }

  .player-filters {
    flex: 0 0 250px;
    display: flex;
    flex-direction: column;
    padding-top: 1.3em;
    border-right: 2px solid #2C2F30;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),
    0 1px 5px 0 rgba(0,0,0,0.12),
    0 3px 1px -2px rgba(0,0,0,0.2);
  }

  .checkboxes-list-title {
    margin-bottom: 0px;
  }

  .checkboxes-list {
    overflow-y: auto;
  }

  .players-list {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
  }
}
</style>
