import { AirviewProvider } from "./airview-provider";
import { SaveEdits } from "./save-edits/save-edits";
import { BranchCreator, BranchSwitcher } from "./branching";
import { AllEntriesMeta } from "./all-entries-meta";
import { Entry } from "./entry";

export function ReduxDemo() {
  return (
    <AirviewProvider>
      <SaveEdits />
      <BranchCreator />
      <BranchSwitcher />
      <AllEntriesMeta />
      <Entry />
    </AirviewProvider>
  );
}
