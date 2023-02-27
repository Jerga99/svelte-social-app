import { writable } from "svelte/store";


function createStore() {
  const form = writable({})

  function setForm(formData) {
    form.set(formData);
  }

  function validate(node, value) {
    console.log(node);
    console.log(value);
  }

  return {
    validate,
    form,
    setForm
  }
}

export const formHandlerStore = createStore();
