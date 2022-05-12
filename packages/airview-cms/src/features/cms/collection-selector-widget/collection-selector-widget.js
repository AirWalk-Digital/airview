// import React from "react";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectAllCollectionsLabelsAndIds } from "../config-slice";

export function CollectionSelectorWidget() {
  const collectionLabelsAndIds = useSelector(selectAllCollectionsLabelsAndIds);
  console.log(collectionLabelsAndIds);

  return null;
}
