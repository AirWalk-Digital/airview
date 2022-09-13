import React from "react";
import PropTypes from "prop-types";
import { Box, Chip } from "@mui/material";

export function FrameworkViewRowDetail({ detailData }) {
  const classes = frameworkRowDetailStyles();

  return (
    <React.Fragment>
      <Box sx={classes.additionalInfoContainer} aria-label="Additional data">
        <Box component="ul" sx={classes.instanceInfo}>
          <Box component="li" sx={classes.instanceInfoItem}>
            <span>Detail:</span>
            <Box component="span" sx={{ marginLeft: 11 }}>
              {detailData.detail}
            </Box>
          </Box>

          <Box component="li" sx={classes.instanceInfoItem}>
            <Box component="span" sx={{ marginTop: 1 }}>
              Control Mapping:
            </Box>
            <Box component="span" sx={{ marginLeft: 1 }}>
              {detailData.controlMappings?.map((controlMappings, index) => {
                return (
                  <Chip
                    key={index}
                    sx={{
                      "&.MuiChip-root": {
                        ...classes.controlMapping,
                        ...classes[
                          `controlMappingIconGap_${controlMappings.gap}`
                        ],
                      },
                    }}
                    label={controlMappings.name}
                  />
                );
              })}
            </Box>
          </Box>

          <Box component="li" sx={classes.instanceInfoItem}>
            <Box component="span" sx={{ marginTop: 0.5 }}>
              Frequency:
            </Box>
            <Box component="span" sx={{ marginLeft: 6.5 }}>
              <Chip
                sx={{ "&.MuiChip-root": classes.frequency }}
                label={detailData.Frequency}
                color="primary"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}

FrameworkViewRowDetail.propTypes = {
  detailData: PropTypes.object.isRequired,
};

function frameworkRowDetailStyles() {
  return {
    additionalInfoContainer: {
      borderTop: 1,
      borderTopColor: "divider",
      display: "flex",
      justifyContent: "space-between",
    },

    instanceInfo: {
      listStyle: "none",
      padding: 2,
      margin: 0,
      flex: "1 1 74.5%",
    },

    instanceInfoItem: {
      padding: 1,
      display: "flex",

      "& > span:first-of-type": {
        fontWeight: "bold",
      },
    },

    frequency: {
      borderRadius: 1,
      flex: "1 1 auto",
      maxWidth: 250,
      fontWeight: "bold",
    },

    controlMapping: {
      margin: 0.5,
      borderRadius: 1,
      flex: "1 1 auto",
      maxWidth: 250,
      fontWeight: "bold",
    },

    controlMappingIconGap_no: {
      backgroundColor: "success.light",
      color: "success.contrastText",
    },

    controlMappingIconGap_partial: {
      backgroundColor: "warning.light",
      color: "warning.contrastText",
    },

    controlMappingIconGap_full: {
      backgroundColor: "grey.500",
      color: "white",
    },
  };
}
