
import { writable } from "svelte/store";

function createStore() {
  const taskList = writable([]);

  setTimeout(() => {
    taskList.set([1,2,3]);
  }, 1000);

  return taskList;
}

export const taskListStore = createStore();
