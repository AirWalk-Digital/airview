import React from "react";
import { AsideAndMainContainer, Main, Aside } from "../../features";
import Documentation from "./aside-and-main.doc.md";

export default {
  title: "Components/Aside and Main Container",
  component: AsideAndMainContainer,
  subcomponents: { Main, Aside },
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
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
