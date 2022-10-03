import { useSetCmsContext } from "airview-cms";
import { Box } from "@mui/material";
import {
  PageTitle,
  AsideAndMainContainer,
  Main,
  StyledWysiwyg,
} from "airview-ui";
export function HomePageView() {
  useSetCmsContext({});
  return (
    <AsideAndMainContainer>
      <Main>
        <PageTitle title={"Airview Demo"} />
        <Box sx={{ marginBottom: 4 }}>
          <StyledWysiwyg>This is a demo application for Airview</StyledWysiwyg>
        </Box>
      </Main>
    </AsideAndMainContainer>
  );
}
