import React from "react";
import PropTypes from "prop-types";
import { Typography, Skeleton } from "@mui/material";

/**
 * The PageTitle component is used to render a title within a document. The HTML tag can be customised (defaults to H1) and CSS styles can be passed through, either as a `style` prop or using the Material UI `sx` prop.
 *
 * ## Component States
 *
 * The PageTitle can be rendered in three states, namely:
 *
 * **Loading - ** The data to render the title is not yet ready, a loading UI will present to the user to indicate the state
 *
 * **Fetching - ** The data has been loaded previously and is now updating, the opacity of the UI will change to indicate a disabled state.
 *
 * **Loaded - ** The data is in a ready state, the title is visible to the user
 *
 * ## Importing the component
 *
 * You can import the Title component as a named import from the airview-ui library
 *
 * ```javascript
 * import { PageTitle } from "airview-ui"
 * ```
 */
export function PageTitle({
  title,
  loading = false,
  fetching = false,
  component,
  sx,
  ...rest
}) {
  return (
    <Typography
      variant="h1"
      gutterBottom
      sx={{
        fontSize: 36,
        fontWeight: "500",
        marginBottom: 4,
        ...(fetching && { opacity: 0.5 }),
        ...sx,
      }}
      {...{ component, ...rest }}
    >
      {loading ? <Skeleton /> : title}
    </Typography>
  );
}

PageTitle.propTypes = {
  /**
   * The title string
   */
  title: PropTypes.string.isRequired,
  /**
   * Set the component to render in a loading state
   */
  loading: PropTypes.bool,
  /**
   * Set the component to render in a fetching state
   */
  fetching: PropTypes.bool,
  /**
   * Set the HTML DOM tag for the title, defaults to H1
   */
  component: PropTypes.string,
  /**
   * Allows passthrough of SX styling props (see Material UI SX docs for more info)
   */
  sx: PropTypes.object,
};
