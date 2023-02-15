
import { writable } from "svelte/store";

function createStore() {
  const taskList = writable([]);

  return taskList;
}

export const taskListStore = createStore();
