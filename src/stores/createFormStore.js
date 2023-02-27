
import { writable } from "svelte/store";


export function createFormStore(initialData) {
  const form = writable(initialData);
  const errors = writable({});

  function validate(node) {
    node.onblur = checkValidity(node);
  }

  const checkValidity = (element) => () => {
    const errorMessage = "ERROR ERROR ERROR!";
    const isValid = false;

    if (!isValid) {
      errors.set({[element.name]: errorMessage});
    } else {
      alert("No Errors!");
    }
  }

  return {
    validate,
    form,
    errors: {subscribe: errors.subscribe}
  }
}

