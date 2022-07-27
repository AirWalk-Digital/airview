The documentation view is a composition of airview-ui components; the result is a view for documentation content, including a persistant topbar and main navigation.

```jsx
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TopBar,
  AsideAndMainContainer,
  Aside,
  Main,
  Menu,
  NavigationDrawer,
  PageTitle,
  StyledWysiwyg,
  Breadcrumb,
} from "airview-ui";

const Logo = styled("img")({
  display: "block",
  width: "auto",
  height: 30,
});

function DocumentationView() {
  const navDrawerWidth = 300;
  const topBarHeight = 64;
  const [menuOpen, setMenuOpen] = useState(true);

  const handleOnNavButtonClick = () => setMenuOpen((prevState) => !prevState);

  return (
    <React.Fragment>
      <TopBar
        onNavButtonClick={handleOnNavButtonClick}
        title="Top Bar Title"
        navOpen={menuOpen}
      >
        <Logo src={logo} alt="Logo alt text" />
      </TopBar>
      <NavigationDrawer
        open={menuOpen}
        top={topBarHeight}
        drawerWidth={navDrawerWidth}
      >
        <Menu
          menuTitle="Main Navigation"
          menuItems={navItems}
          initialCollapsed={false}
          loading={args.loading}
          fetching={args.fetching}
        />
      </NavigationDrawer>
      <div
        style={{
          marginTop: topBarHeight,
          paddingLeft: menuOpen ? navDrawerWidth : 0,
        }}
      >
        <AsideAndMainContainer>
          <Main>
            <Breadcrumb
              currentRoute={pageTitle}
              loading={args.loading}
              fetching={args.fetching}
              links={breadcrumbItems}
              sx={{ marginBottom: 4 }}
            />
            <PageTitle
              title="Documentation View"
              loading={args.loading}
              fetching={args.fetching}
            />
            <StyledWysiwyg loading={args.loading} fetching={args.fetching}>
              {content}
            </StyledWysiwyg>
          </Main>
          <Aside>
            <Menu
              menuTitle="Table of Contents"
              menuItems={tocItems}
              initialCollapsed={false}
              loading={args.loading}
              fetching={args.fetching}
            />
          </Aside>
        </AsideAndMainContainer>
      </div>
    </React.Fragment>
  );
}
```
