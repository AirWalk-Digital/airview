import { Routes, Route } from "react-router-dom";
import { AirviewProvider, useTest } from "./library";
import { config } from "./config";
import { MainLayout, EntryView } from "./demo";
import "./styles.css";
import { useEffect, useState } from "react";

// export function ReduxDemo() {
//   return (
//     <AirviewProvider config={config}>
//       <Routes>
//         <Route path="/" element={<MainLayout />}>
//           <Route path=":collection/:entry" element={<EntryView />} />
//           <Route path="*" element={<span>Entry not found!</span>} />
//         </Route>
//       </Routes>
//     </AirviewProvider>
//   );
// }

export function ReduxDemo() {
  return (
    <AirviewProvider config={config}>
      <Test />
    </AirviewProvider>
  );
}

function Test() {
  const [state, setState] = useState({
    id: "application/ms_teams",
    branch: "main",
  });

  const response = useTest(state.id, state.branch);

  //console.log(response);

  useEffect(() => {
    setTimeout(() => {
      console.log("SWITCH BRANCH: ONE");
      setState({
        id: "release/security_patch",
        branch: "one",
      });
    }, [5000]);
  }, []);

  if (response.isLoading || response.isUninitialized)
    return <div>Loading...</div>;

  if (response.isFetching) return <div>Refetching data...</div>;

  if (response.isError)
    return (
      <>
        <p>Error:</p>
        <pre>{JSON.stringify(response.error, null, 2)}</pre>
      </>
    );

  return (
    <>
      <p>Success:</p>
      <pre>{JSON.stringify(response.data, null, 2)}</pre>
    </>
  );
}
