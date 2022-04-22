export const test = () => {
  return (name) => {
    const greeting = name ?? "unknown";
    console.log(greeting);
  };
};
