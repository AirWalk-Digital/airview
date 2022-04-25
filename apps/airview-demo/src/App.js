import { greet } from "airview-cms";

function App() {
  const greetJames = greet();

  greetJames("James");
  return null;
}

export default App;
