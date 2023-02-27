
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
      // errors.update((_errors) => {
      //   _errors[element.name] = errorMessage;
      //   return _errors;
      // })

      errors.update((_errors) => ({..._errors, [element.name]: errorMessage}));
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

