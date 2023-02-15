
import { writable } from "svelte/store";

function createStore() {

  const taskList = writable([], () => {
    let i = 0;
   
    const id = setInterval(() => {
      console.log("Updating Value");
      taskList.update((list) => [...list, i++])
    }, 2000);

    return function stop() {
      clearInterval(id);
    }
  });
  
  return taskList;
}

export const taskListStore = createStore();
