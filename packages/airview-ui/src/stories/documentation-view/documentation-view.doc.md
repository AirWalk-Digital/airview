The documentation view is a composition of airview-ui components; the result is a view for documentation content, including a persistant topbar and main navigation.

```jsx
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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
  Search,
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
  const [searchOpen, setSearchOpen] = useState(false);

  const handleOnNavButtonClick = () => setMenuOpen((prevState) => !prevState);

  const handleOnQueryChange = async () => [];

  return (
    <React.Fragment>
      <Search
        open={searchOpen}
        onRequestToClose={() => setSearchOpen(false)}
        onQueryChange={handleOnQueryChange}
        linkComponent="a"
      />
      <TopBar
        onNavButtonClick={handleOnNavButtonClick}
        title="Top Bar Title"
        navOpen={menuOpen}
      >
        <Logo src={logo} alt="Logo alt text" />
        <IconButton
          aria-label="search"
          size="large"
          edge="end"
          sx={{ color: "common.white", marginLeft: "auto" }}
          onClick={() => setSearchOpen(true)}
        >
          <SearchIcon />
        </IconButton>
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
