import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  Typography,
  CircularProgress,
  Button,
  IconButton,
  InputBase,
  Box,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import parse from "html-react-parser";
import { useSearch } from "./use-search";

export function Search({
  open,
  onRequestToClose,
  onQueryChange,
  linkComponent,
}) {
  const inputRef = useRef();

  const { state, reset, handleOnChange, handleOnReady } =
    useSearch(onQueryChange);

  const handleOnRequestToClose = () => onRequestToClose();

  useEffect(() => {
    if (state.ready) {
      inputRef.current.focus();
    }
  }, [state.ready]);

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      onClose={handleOnRequestToClose}
      TransitionProps={{
        onExited: reset,
        onEntered: handleOnReady,
      }}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          overflow: "hidden",
          minHeight: 80,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        {state.working ? (
          <CircularProgress size={28} />
        ) : (
          <SearchIcon sx={{ fontSize: "1.75rem" }} />
        )}

        <InputBase
          type="search"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="Search..."
          sx={{
            height: "40px",
            fontSize: 21,
            flex: "1 1 auto",
            padding: 0,
            margin: "0 16px",
            border: 0,
            outline: 0,

            "& ::-webkit-search-decoration, & ::-webkit-search-cancel-button, & ::-webkit-search-results-button, & ::-webkit-search-results-decoration":
              {
                display: "none",
              },
          }}
          value={state.query}
          onChange={handleOnChange}
          ref={inputRef}
        />

        {state.query.length > 0 && (
          <IconButton
            aria-label="Clear query"
            size="small"
            sx={{
              marginRight: 2,
            }}
            onClick={reset}
          >
            <CloseIcon />
          </IconButton>
        )}

        <Button
          variant="outlined"
          disableElevation
          size="small"
          onClick={handleOnRequestToClose}
        >
          Close
        </Button>
      </Box>

      {state.errorMessage || state.results ? (
        <Box
          sx={{
            maxHeight: 400,
            overflow: "auto",
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          {state.errorMessage || state.results.length < 1 ? (
            <Box sx={{ padding: "40px 20px" }}>
              <Typography align="center" aria-label="Feedback">
                {state.errorMessage ?? (
                  <>
                    No results found for{" "}
                    <strong>&quot;{state.query}&quot;</strong>
                  </>
                )}
              </Typography>
            </Box>
          ) : null}

          {!state.errorMessage && state.results?.length >= 1 ? (
            <Box
              component="ul"
              sx={{
                margin: 0,
                padding: "0px 20px",
                listStyle: "none",

                "& li:not(:last-of-type)": {
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                },
              }}
            >
              {state.results.map((result, index) => {
                return (
                  <li key={index}>
                    <Link
                      component={linkComponent}
                      {...result.linkProps}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "text.primary",
                        padding: "10px 10px",
                        margin: "10px 0",
                        transition: "background-color 0.2s ease-in-out",
                        "&:hover": {
                          bgcolor: "grey.100",
                          borderRadius: 1,
                        },
                        fontFamily: "default",
                        fontSize: 14,
                        lineHeight: "20px",
                      }}
                    >
                      <Box
                        sx={{
                          marginRight: "20px",

                          "& mark": {
                            backgroundColor: "#e7eff5",
                            color: "#376485",
                            fontWeight: "bold",
                          },
                        }}
                      >
                        <Box component="span" sx={{ display: "block" }}>
                          {parse(result.title)}
                        </Box>
                        {result?.summary ? (
                          <Box
                            component="span"
                            sx={{ color: "text.secondary" }}
                          >
                            {parse(result.summary)}
                          </Box>
                        ) : null}
                      </Box>

                      <ChevronRightIcon
                        sx={{ marginLeft: "auto", color: "primary.main" }}
                      />
                    </Link>
                  </li>
                );
              })}
            </Box>
          ) : null}
        </Box>
      ) : null}
    </Dialog>
  );
}

Search.propTypes = {
  /**
   * Toggles the visibility of the search UI modal
   */
  open: PropTypes.bool.isRequired,
  /**
   * Callback fired when the modal requests to close **Signature:** `function() => void`
   */
  onRequestToClose: PropTypes.func.isRequired,
  /**
   * Callback fired when the user has changed the query input value, expects the return of a resolved or rejected promise. **Signature:** `function(query:String) => Promise.resolve([{title:String, summary?:String, linkProps:Object }]) || Promise.reject({message:String})`
   */
  onQueryChange: PropTypes.func.isRequired,
  /**
   * Component used for routing i.e React Router `Link`
   */
  linkComponent: PropTypes.node.isRequired,
};
