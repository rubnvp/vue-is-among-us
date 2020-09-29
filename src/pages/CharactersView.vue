<template>
  <div class="characters-view">
    <!-- Pokemon Filters -->
    <aside class="pokedex-filters">
      <!-- Searchbox -->
      <nice-input v-model="searchText" placeholder="Search by name" />
      <!-- Checkboxes -->
      <p class="checkboxes-list-title">Type</p>
      <div class="checkboxes-list">
        <nice-checkbox
          v-for="(color, type) in TYPE_COLOR" :key="type"
          v-model="selectedPokemonTypes"
          :value="type"
          :color="color"
          :label="type"
        />
      </div>
    </aside>

    <!-- Pokemons list -->
    <main class="main-view">
      <transition-group name="bounce" tag="article" class="pokemons-list">
        <!-- Pokemon Card -->
        <pokemon-card
          v-for="pokemon in filteredPokemons"
          :key="pokemon.name"
          :pokemon="pokemon"
          :background-colors="pokemon.types.map(type => TYPE_COLOR[type])"
          @remove="removePokemon"
        ></pokemon-card>
      </transition-group>
    </main>
  </div>
</template>

<script>
import {TYPE_COLOR} from "@/common/constants";

import NiceInput from '@/components/NiceInput.vue';
import NiceCheckbox from '@/components/NiceCheckbox.vue';
import PokemonCard from '@/components/PokemonCard.vue';

export default {
  name: 'CharactersView',
  components: {
    NiceInput,
    NiceCheckbox,
    PokemonCard,
  },
  data() {
    return {
      searchText: '',
      TYPE_COLOR,
      selectedPokemonTypes: [],
      pokemons: [],
    };
  },
  computed: {
    filteredPokemons() {
      return this.pokemons
        .filter(pokemon => pokemon.name.includes(this.searchText)) // filter by name (searchBox)
        .filter(pokemon => { // filter by pokemon type (checkboxes)
          if (this.selectedPokemonTypes.length === 0) return true; // no checked checkbox means no filter
          return pokemon.types
            .find(type => this.selectedPokemonTypes.includes(type));
        });
    },
  },
  methods: {
    removePokemon(pokemonToDelete) {
      this.pokemons = this.pokemons
        .filter(pokemon => pokemon !== pokemonToDelete);
    },
  },
  created() {
    fetch('/pokemons.json')
      .then(response => response.json())
      .then(pokemons => this.pokemons = pokemons);
  },
};
</script>

<style lang="scss">
.characters-view {
  display: flex;
  flex: 1;

  .main-view {
    overflow-y: auto;
  }

  .pokedex-filters {
    flex: 0 0 250px;
    display: flex;
    flex-direction: column;
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

  .pokemons-list {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    height: calc(100vh - 76px);
  }
}
</style>
