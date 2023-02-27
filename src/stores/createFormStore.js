import { afterUpdate, beforeUpdate, onDestroy, onMount } from "svelte";
import { writable } from "svelte/store";


export function createFormStore(initialData) {
  const form = writable(initialData);

  onMount(() => {
    console.log("createFormStore onMount called!");
  })

  onDestroy(() => {
    console.log("createFormStore onDestroy called!");
  })

  beforeUpdate(() => {
    console.log("createFormStore beforeUpdate called!");
  })

  afterUpdate(() => {
    console.log("createFormStore afterUpdate called!");
  })

  function validate(node, value) {
    console.log(node);
    console.log(value);
  }

  return {
    validate,
    form
  }
}

