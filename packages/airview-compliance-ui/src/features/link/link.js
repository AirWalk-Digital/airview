import React from "react";
import PropTypes from "prop-types";
import { HashLink } from "react-router-hash-link";
import { Link as MuiLink } from "@material-ui/core";
import clsx from "clsx";
import { useLocation } from "../../hooks/use-location";

export const Link = React.forwardRef(
  ({ href, noLinkStyle = false, activeClassName, children, ...rest }, ref) => {
    const { className, ...otherProps } = rest;

    const location = useLocation();

    const internal = /^\/(?!\/)/.test(href);
    const isFile = /\.[0-9a-z]+$/i.test(href);

    if (!internal || isFile) {
      if (noLinkStyle) {
        return (
          <a
            rel="noreferrer"
            target="_blank"
            {...{ href, ref, className }}
            {...otherProps}
          >
            {children}
          </a>
        );
      }

      return (
        <MuiLink
          rel="noreferrer"
          target="_blank"
          {...{ href, ref, className }}
          {...otherProps}
        >
          {children}
        </MuiLink>
      );
    }

    const classes = clsx(className, href === location ? activeClassName : null);

    if (noLinkStyle) {
      return (
        <HashLink to={href} className={classes} smooth {...otherProps}>
          {children}
        </HashLink>
      );
    }

    return (
      <MuiLink
        component={HashLink}
        to={href}
        smooth
        className={classes}
        {...{ ref }}
        {...otherProps}
      >
        {children}
      </MuiLink>
    );
  }
);

Link.displayName = "Link";

Link.propTypes = {
  /**
   * Sets the href for the link
   */
  href: PropTypes.string.isRequired,
  /**
   * Renders the link with no MUI Link styles
   */
  noLinkStyle: PropTypes.bool,
  /**
   * Applies an active classname to the Link (if required)
   */
  activeClassName: PropTypes.string,
  /**
   * Used to set the inner content of the link
   */
  children: PropTypes.node.isRequired,
};
