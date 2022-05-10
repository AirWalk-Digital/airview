import React from "react";
import PropTypes from "prop-types";
import { SvgIcon } from "@mui/material";

export const FontAwesomeSvgIcon = React.forwardRef((props, ref) => {
  const { icon, ...restProps } = props;

  const {
    icon: [width, height, , , svgPathData],
  } = icon;

  return (
    <SvgIcon ref={ref} viewBox={`0 0 ${width} ${height}`} {...restProps}>
      {typeof svgPathData === "string" ? (
        <path d={svgPathData} />
      ) : (
        svgPathData.map((d, i) => (
          <path key={i} style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
        ))
      )}
    </SvgIcon>
  );
});

FontAwesomeSvgIcon.displayName = "FontAwesomeSvgIcon";

FontAwesomeSvgIcon.propTypes = {
  icon: PropTypes.any.isRequired,
};
