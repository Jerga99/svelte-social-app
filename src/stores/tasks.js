
import { writable } from "svelte/store";

function createStore() {

  const taskList = writable([], () => {
    let i = 0;
    console.log("Subscribed to the store!");

    setInterval(() => {
      taskList.update((list) => [...list, i++])
    }, 2000);
  });
  
  return taskList;
}

export const taskListStore = createStore();
