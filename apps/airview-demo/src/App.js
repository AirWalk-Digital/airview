import { greet } from "airview-core";

function App() {
  const greetJames = greet();

  greetJames("James");
  return null;
}

export default App;
