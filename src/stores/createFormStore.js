
import { writable } from "svelte/store";


export function createFormStore(initialData) {
  const form = writable(initialData);
  const errors = writable({});

  function validate(node) {
    node.onblur = checkValidity(node);
  }

  const checkValidity = (element) => () => {
    const errorMessage = "ERROR ERROR ERROR!";
    const isValid = validator();

    if (!isValid) {
      // errors.update((_errors) => {
      //   _errors[element.name] = errorMessage;
      //   return _errors;
      // })

      errors.update((_errors) => ({..._errors, [element.name]: errorMessage}));
    } else {
      errors.update((_errors) => ({..._errors, [element.name]: ""}));
    }
  }

  function validator() {
    return Math.floor(Math.random() * 2) === 0 ? false : true;
  }

  return {
    validate,
    form,
    errors: {subscribe: errors.subscribe}
  }
}

