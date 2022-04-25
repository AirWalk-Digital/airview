export function greet() {
  return (name) => {
    const greeting = name ?? "unknown";

    console.log(`Hello ${greeting}`);
  };
}
