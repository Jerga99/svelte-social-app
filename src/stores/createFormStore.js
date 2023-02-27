
import { writable } from "svelte/store";


export function createFormStore(initialData) {
  const form = writable(initialData);

  function validate(node) {
    node.onblur = checkValidity();
  }

  const checkValidity = () => () => {
    const errorMessage = "ERROR ERROR ERROR!";
    const isValid = true;

    if (!isValid) {
      alert(errorMessage);
    } else {
      alert("No Errors!");
    }
  }

  return {
    validate,
    form
  }
}

