// import { Routes, Route } from "react-router-dom";
import { AirviewProvider } from "./library";
import { config } from "./config";
// import { MainLayout, EntryView } from "./demo";
import "./styles.css";

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

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBranches } from "./library";

export function ReduxDemo() {
  return (
    <AirviewProvider config={config}>
      <Test />
    </AirviewProvider>
  );
}

function Test() {
  const dispatch = useDispatch();
  const branchesSlice = useSelector((state) => state.branches);

  console.log(branchesSlice);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchBranches());
    }, 5000);
  }, [dispatch]);

  return <span>Test</span>;
}
