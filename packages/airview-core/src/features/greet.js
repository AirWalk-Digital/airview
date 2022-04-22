export function greet(name) {
  return () => {
    const greeting = name ?? "stranger";

    console.log(`Hello ${greeting}!`);
  };
}
