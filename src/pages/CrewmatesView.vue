<template>
  <div class="characters-view">
    <!-- Crewmate Filters -->
    <aside class="crewmate-filters">
      <!-- Searchbox -->
      <nice-input v-model="searchText" placeholder="Search by name" />
      <!-- Checkboxes -->
      <p class="checkboxes-list-title">Hat</p>
      <div class="checkboxes-list">
        <nice-checkbox
          v-model="selectedCrewmateHats"
          :value="false"
          label="🚫 No hat"
        />
        <nice-checkbox
          v-model="selectedCrewmateHats"
          :value="true"
          label="🧢 With hat"
        />
      </div>
      <p class="checkboxes-list-title">Color</p>
      <div class="checkboxes-list">
        <nice-checkbox
          v-for="(rgb, color) in COLOR_RGB" :key="color"
          v-model="selectedCrewmateColors"
          :value="color"
          :color="rgb"
          :label="color"
        />
      </div>
    </aside>

    <!-- Crewmates list -->
    <main class="main-view">
      <transition-group name="bounce" tag="article" class="crewmates-list">
        <!-- Crewmate Card -->
        <crew-card
          v-for="crewmate in filteredCrewmates"
          :key="crewmate.name"
          :crewmate="crewmate"
          :background-color="COLOR_RGB[crewmate.color]"
          @remove="removeCrewmate"
        ></crew-card>
      </transition-group>
    </main>
  </div>
</template>

<script>
import {COLOR_RGB} from "@/common/constants";

import NiceInput from '@/components/NiceInput.vue';
import NiceCheckbox from '@/components/NiceCheckbox.vue';
import CrewCard from '@/components/CrewCard.vue';

export default {
  name: 'CharactersView',
  components: {
    NiceInput,
    NiceCheckbox,
    CrewCard,
  },
  data() {
    return {
      searchText: '',
      COLOR_RGB,
      selectedCrewmateHats: [],
      selectedCrewmateColors: [],
      crewmates: [],
    };
  },
  computed: {
    filteredCrewmates() {
      return this.crewmates
        .filter(crewmate => crewmate.name.toLowerCase().includes(this.searchText.toLowerCase())) // filter by name (searchBox)
        .filter(crewmate => { // filter by crewmate hat
          if (this.selectedCrewmateHats.length === 0) return true; // no checked checkbox means no filter
          return this.selectedCrewmateHats.includes(crewmate.hasHat);
        })
        .filter(crewmate => { // filter by crewmate color
          if (this.selectedCrewmateColors.length === 0) return true; // no checked checkbox means no filter
          return this.selectedCrewmateColors.includes(crewmate.color);
        });
    },
  },
  methods: {
    removeCrewmate(crewmateToDelete) {
      this.crewmates = this.crewmates
        .filter(crewmate => crewmate !== crewmateToDelete);
    },
  },
  created() {
    fetch('/crewmates.json')
      .then(response => response.json())
      .then(crewmates => this.crewmates = crewmates);
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

  .crewmate-filters {
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

  .crewmates-list {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
  }
}
</style>
