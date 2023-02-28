
import { get, writable } from "svelte/store";


export function createFormStore(initialData) {
  const form = writable(initialData);
  const errors = writable({});

  const validatorFields = {};

  function validate(node, validators = []) {
    let config;
    validatorFields[node.name] = config = {element: node, validators};

    node.onblur = checkValidity(config);
    node.oninput = () => {
      if (!get(errors)[node.name]) { return; }
      checkValidity(config)();
    };
  }

  function isValid() {
    const _errors = get(errors);
    const keys = Object.keys(_errors);

    if (keys.length === 0) {
      return false;
    }

    return keys.every((errorKey) => {
      return _errors[errorKey].length === 0;
    });
  }

  const checkValidity = ({element, validators}) => () => {
    errors.update(_errors => {
      _errors[element.name] = [];
      return _errors;
    });
    
    for (const validator of validators) {
      const errorMessage = validator(element)(get(form));

      if (errorMessage) {
        errors.update(_errors => {
          _errors[element.name].push(errorMessage);
          return _errors;
        })
      } 
    }
  }

  const submitForm = (callback) => () => {
    for (const field in validatorFields) {
      const config = validatorFields[field];

      checkValidity(config)();
    }

    if (isValid()) {
      callback(get(form));
    }
  }

  return {
    submitForm,
    validate,
    setValue: (e) => {
      const { value, name } = e.target;
      form.update((_form) => {
        _form[name] = value;
        return _form;
      }) 
    },
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

export const compareWithValidator = (element, compareToFieldName) => (form) => {
  if (element.value.length === 0) { return ""; }

  const compareToValue = form[compareToFieldName];

  return element.value === compareToValue ? 
    "" : 
    `${niceName(element.name)} should be same as ${niceName(compareToFieldName)}`;

}

export const requiredValidator = ({name, value}) => () => {
  return value.length === 0 ? `${niceName(name)} is required` : "";
}

export const minLengthValidator = (element, minLength = 7) => () => {
  if (
    element.value.length === 0 ||
    element.value.length > minLength
  ) { return ""; }

  return `${niceName(element.name)} should be more than ${minLength} characters`;
}

export const maxLengthValidator = (element, maxLength = 7) => () => {
  if (
    element.value.length === 0 ||
    element.value.length < maxLength
  ) { return ""; }

  return `${niceName(element.name)} should be less than ${maxLength} characters`;
}

export const firstUppercaseLetter = ({value, name}) => () => {
  if (value.length === 0) { return ""; }

  return value[0] === value[0].toUpperCase() ? 
    "" : 
    `${niceName(name)} first letter should be uppercased`;
}

