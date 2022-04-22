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

/*
- features
- - airview-provider
- - config-provider
- - custom router
- - get-remote-branches
- - get-all-entries-metadata
- - get-entry
- - set-editor-context
- - create-branch
- - switch-branch
- - save-edits
- - clear-edits
- - raise-pull-request
- - create-new-content
- - edit-body-content
- - edit-metadata
*/

/*
- constants
- util
- features
- - redux
- - - store
- - - branches
- - - - fetchRemoteBranches
- - - - branches-slice
- - - all-entries-meta
- - - - fetchAllEntriesMeta
- - - - all-entries-meta-slice
- - - editor
- - - - fetch-entry
- - - - editor-slice
- - airview-provider
- - config-provider
- - custom router
- - get-entry
- - branch-creator
- - branch-switcher
- - save-edits
- - clear-edits
- - raise-pull-request
- - content-creator
- - markdown-editor
- - metadata-editor
*/

/*
- constants
- util
- - fetch-client
- - airview-error
- features
- - airview-provider
- - config-provider
- - router
- - editor
- - - fetch-remote-branches
- - - editor-slice
- - - save-edits
- - - clear-edits
- - - create-branch
- - - switch-branch
- - - raise-pull-request
- - - create-new-content
- - - markdown-editor
- - - metadata-editor
- - - editor
- - use-get-all-entries-meta
- - - fetch-all-entries-meta
- - - all-entries-meta-slice
- - use-get-entry
- - - fetch-entry
- - - use-get-entry
- tests
- stories
*/
