
import { writable } from "svelte/store";


export function createFormStore(initialData) {
  const form = writable(initialData);

  function validate(node, value) {
    
    node.onblur = (e) => {
      console.log(`blur on ${e.target.name} called with value ${e.target.value}`);
    }

    node.oninput = (e) => {
      console.log(`onInput on ${e.target.name} called with value ${e.target.value}`);
    }
  }

  return {
    validate,
    form
  }
}

