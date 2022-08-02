import React from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";

export function ApplicationTileDivider({ classNames }) {
  return <Divider className={classNames} variant="middle" />;
}

ApplicationTileDivider.propTypes = {
  /**
   * Allows the passing of additional style classes to the component root node
   */
  classNames: PropTypes.string,
};
