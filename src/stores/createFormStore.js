
import { writable } from "svelte/store";


export function createFormStore(initialData) {
  const form = writable(initialData);
  const errors = writable({});

  function validate(node) {
    node.onblur = checkValidity(node);
  }

  const checkValidity = (element) => () => {
    const errorMessage = `${element.name} should have max 7 characters`;
    const isValid = validator(element);

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

  function validator(element) {
    if (element.value.lenght === 0) { return true; }

    return element.value.length < 7;
  }

  return {
    validate,
    form,
    errors: {subscribe: errors.subscribe}
  }
}

