

export function clickOutside(node) {
  addEventListener("click", handleClick);

  function handleClick(e) {
    if (!node.contains(e.target)) {
      node.dispatchEvent(new CustomEvent("outclick"));
    }
  }

  return {
    destroy() {
      removeEventListener("click", handleClick);
    }
  }
}
