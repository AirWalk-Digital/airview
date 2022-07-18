import React from "react";
import { AsideAndMainContainer, Main, Aside } from "../features";

export default {
  title: "Components/Aside and Main Container",
  component: AsideAndMainContainer,
  subcomponents: { Main, Aside },
};

export const Default = () => {
  return (
    <AsideAndMainContainer>
      <Main>
        <span>Main Content</span>
      </Main>
      <Aside>
        <span>Aside Content</span>
      </Aside>
    </AsideAndMainContainer>
  );
};
