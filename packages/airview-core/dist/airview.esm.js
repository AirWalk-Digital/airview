function greet(name) {
  return function () {
    var greeting = name !== null && name !== void 0 ? name : "stranger";
    console.log("Hello ".concat(greeting, "!"));
  };
}

export { greet };
