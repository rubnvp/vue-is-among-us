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

<script>
import {COLOR_RGB} from "@/common/constants";

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
  data() {
    return {
      searchText: '',
      COLOR_RGB,
      selectedHats: [],
      selectedColors: [],
      players: [],
    };
  },
  computed: {
    filteredPlayers() {
      return this.players
        .filter(player => player.name.toLowerCase().includes(this.searchText.toLowerCase())) // filter by name (searchBox)
        .filter(player => { // filter by player hat
          if (this.selectedHats.length === 0) return true; // no checked checkbox means no filter
          return this.selectedHats.includes(player.hasHat);
        })
        .filter(player => { // filter by player color
          if (this.selectedColors.length === 0) return true; // no checked checkbox means no filter
          return this.selectedColors.includes(player.color);
        });
    },
  },
  methods: {
    removePlayer(playerToDelete) {
      this.players = this.players
        .filter(player => player !== playerToDelete);
    },
  },
  created() {
    fetch('/players.json')
      .then(response => response.json())
      .then(players => this.players = players);
  },
};
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
