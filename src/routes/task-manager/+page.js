
export const ssr = false;

export function load() {
  // fetch data from API/Database ...
  console.log("Calling Load!");
  return {
    appName: "Task Manager",
    content: "Board"
  }
}
