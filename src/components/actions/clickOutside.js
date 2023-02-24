

export function clickOutside(node) {
  console.log("I am called on: " + node);

  return {
    destroy() {
      console.log("I am destroyed!");
    }
  }
}
