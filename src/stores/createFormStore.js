
import { writable } from "svelte/store";


export function createFormStore(initialData) {
  const form = writable(initialData);
  const errors = writable({});

  function validate(node, validators = []) {
    node.onblur = checkValidity(node, validators);
  }

  const checkValidity = (element, validators) => () => {
    errors.update(_errors => {
      _errors[element.name] = [];
      return _errors;
    });
    
    for (const validator of validators) {
      const errorMessage = validator(element);

      if (errorMessage) {
        errors.update(_errors => {
          _errors[element.name].push(errorMessage);
          return _errors;
        })
      } 
    }
  }

  return {
    validate,
    form,
    errors: {subscribe: errors.subscribe}
  }
}

// "myFullName" -> ["my", "full", "Name"]

function niceName(text) {
  const words = text.split(/(?=[A-Z])/);

  return (words.map((word, i) => {
    if (i === 0) {
      return word[0].toUpperCase() + word.substring(1);
    }

    return word.toLowerCase();
  })).join(" ");
}

export function requiredValidator({name, value}) {
  return value.length === 0 ? `${niceName(name)} is required` : "";
}

export function minLengthValidator(element, minLength = 7) {
  if (
    element.value.length === 0 ||
    element.value.length > minLength
  ) { return ""; }

  return `${niceName(element.name)} should be more than ${minLength} characters`;
}

export function maxLengthValidator(element, maxLength = 7) {
  if (
    element.value.length === 0 ||
    element.value.length < maxLength
  ) { return ""; }

  return `${niceName(element.name)} should be less than ${maxLength} characters`;
}

export function firstUppercaseLetter({value, name}) {
  if (value.length === 0) { return ""; }

  return value[0] === value[0].toUpperCase() ? 
    "" : 
    `${niceName(name)} first letter should be uppercased`;
}

