

function createStore() {
  function validate(node, value) {
    console.log(node);
    console.log(value);
  }

  return {
    validate
  }
}

export const formHandlerStore = createStore();
