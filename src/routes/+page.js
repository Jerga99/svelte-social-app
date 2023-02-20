
export const prerender = true;

export function load() {
  const randomNum = Math.floor(Math.random() * 10);
  console.log("Calling Load: " + randomNum);

  return {
    test1: "Hello World",
    test2: randomNum
  }
}
