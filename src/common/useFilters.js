import {ref} from "vue";

export function useSearchText() {
  const searchText = ref('');
  function filterBySearchText(player) {
    return player.name.toLowerCase().includes(searchText.value.toLowerCase());
  }
  return {searchText, filterBySearchText};
}

export function useSelectedHats() {
  const selectedHats = ref([]);
  function filterBySelectedHats(player) { // filter by player hat
    if (selectedHats.value.length === 0) return true; // no checked checkbox means no filter
    return selectedHats.value.includes(player.hasHat);
  }
  return {selectedHats, filterBySelectedHats};
}

export function useSelectedColors() {
  const selectedColors = ref([]);
  function filterBySelectedColors(player) { // filter by player color
    if (selectedColors.value.length === 0) return true; // no checked checkbox means no filter
    return selectedColors.value.includes(player.color);
  }
  return {selectedColors, filterBySelectedColors};
}