import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setWorkingBranch } from "../cms.slice";

function useEnableBranchViaSearchParam() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const branchSearchParam = searchParams.get("branch");

    if (branchSearchParam) {
      searchParams.delete("branch");
      setSearchParams(searchParams);

      dispatch(setWorkingBranch(branchSearchParam));
    }
  }, [searchParams, setSearchParams, dispatch]);
}

export { useEnableBranchViaSearchParam };
