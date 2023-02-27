import { writable } from "svelte/store";


export function createFormStore(initialData) {
  const form = writable(initialData);

  function validate(node, value) {
    console.log(node);
    console.log(value);
  }

  return {
    validate,
    form
  }
}

