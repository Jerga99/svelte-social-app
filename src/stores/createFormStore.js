
import { writable } from "svelte/store";


export function createFormStore(initialData) {
  const form = writable(initialData);
  const errors = writable({});

  function validate(node, validators = []) {
    node.onblur = checkValidity(node, validators);
  }

  const checkValidity = (element, validators) => () => {
    
    for (const validator of validators) {
      const errorMessage = validator(element);

      if (errorMessage) {
        errors.update((_errors) => ({..._errors, [element.name]: errorMessage}));
      } else {
        errors.update((_errors) => ({..._errors, [element.name]: ""}));
      }
    }
  }

  return {
    validate,
    form,
    errors: {subscribe: errors.subscribe}
  }
}


export function maxLengthValidator(element, maxLength = 7) {
  if (
    element.value.length === 0 ||
    element.value.length < maxLength
  ) { return ""; }

  return `${element.name} should be less then ${maxLength} characters`;
}

