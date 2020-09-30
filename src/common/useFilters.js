import {ref} from "vue";

export function useSearchText() {
  const searchText = ref('');
  function filterBySearchText(crewmate) {
    return crewmate.name.toLowerCase().includes(searchText.value.toLowerCase());
  }
  return {searchText, filterBySearchText};
}

export function useSelectedHats() {
  const selectedHats = ref([]);
  function filterBySelectedHats(crewmate) { // filter by crewmate hat
    if (selectedHats.value.length === 0) return true; // no checked checkbox means no filter
    return selectedHats.value.includes(crewmate.hasHat);
  }
  return {selectedHats, filterBySelectedHats};
}

export function useSelectedColors() {
  const selectedColors = ref([]);
  function filterBySelectedColors(crewmate) { // filter by crewmate color
    if (selectedColors.value.length === 0) return true; // no checked checkbox means no filter
    return selectedColors.value.includes(crewmate.color);
  }
  return {selectedColors, filterBySelectedColors};
}