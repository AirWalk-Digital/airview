import { useCallback, useState, useMemo, useEffect, useRef } from "react";
import debounce from "lodash/debounce";

function highlightQueryWithinString(inputString, query) {
  const keywords = query.split(/\s/);

  const regExp = new RegExp(`(${keywords.join("|")})`, "gi");

  let outputString = inputString.replaceAll(regExp, (match) => {
    return `<mark>${match}</mark>`;
  });

  return outputString;
}

export function useSearch(fetchResults) {
  const initialState = {
    query: "",
    working: false,
    results: null,
    errorMessage: null,
    ready: false,
  };

  const [state, setState] = useState({ ...initialState });

  const queryIdRef = useRef(0);

  const reset = () => {
    queryIdRef.current++;
    setState({ ...initialState });
  };

  const getResults = useCallback(
    async (query, queryId) => {
      try {
        if (queryId === queryIdRef.current) {
          setState((prevState) => ({
            ...prevState,
            working: true,
          }));
        }

        const results = await fetchResults(query);

        const highlightedResults = results.map((result) => {
          return {
            ...result,
            title: highlightQueryWithinString(result.title, query),
            summary: result?.summary
              ? highlightQueryWithinString(result.summary, query)
              : null,
          };
        });

        if (queryId === queryIdRef.current) {
          setState((prevState) => ({
            ...prevState,
            working: false,
            results: highlightedResults,
            errorMessage: null,
          }));
        }
      } catch (error) {
        if (queryId === queryIdRef.current) {
          setState((prevState) => ({
            ...prevState,
            working: false,
            results: null,
            errorMessage: error.message,
          }));
        }
      }
    },
    [fetchResults]
  );

  const debouncedGetResults = useMemo(() => {
    return debounce((query, queryId) => getResults(query, queryId), 500);
  }, [getResults]);

  const handleOnChange = (event) => {
    event.persist();

    const query = event.target.value.trimStart();

    if (!query.length) {
      reset();
    } else {
      setState((prevState) => ({ ...prevState, query }));

      debouncedGetResults(query, queryIdRef.current);
    }
  };

  const handleOnReady = () => {
    setState((prevState) => ({ ...prevState, ready: true }));
  };

  useEffect(() => {
    const currentQueryRefId = queryIdRef.current;
    return () => (queryIdRef.current = currentQueryRefId + 1);
  }, []);

  return {
    state,
    reset,
    handleOnChange,
    handleOnReady,
  };
}
