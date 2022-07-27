import React, { useState } from "react";
import { Title, Description } from "@storybook/addon-docs";
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
} from "../../features";
import documentation from "./documentation-view.doc.md";

export default {
  title: "Compositions/Documentation View",
  parameters: {
    layout: "fullscreen",
    controls: false,
    docs: {
      page: () => {
        return (
          <>
            <Title />
            <Description>{documentation}</Description>
          </>
        );
      },
    },
  },
};

const navItems = [
  {
    groupTitle: "Menu Group Title One",
    links: [
      {
        label: "Menu Item One",
        url: "",
      },
      {
        label: "Menu Item Two",
        url: "",
      },
    ],
  },
  {
    groupTitle: "Menu Group Title Two",
    links: [
      {
        label: "Menu Item One",
        url: "",
      },
      {
        label: "Menu Item Two",
        url: "",
      },
    ],
  },
];

const tocItems = [
  {
    groupTitle: null,
    links: [
      {
        label: "Documentation View",
        url: "#documentation-view",
      },
      {
        label: "First Level Header",
        url: "#first-level-header",
      },
      {
        label: "Second Level Header",
        url: "#second-level-header",
      },
      {
        label: "Third Level Header",
        url: "#third-level-header",
      },
      {
        label: "Forth Level Header",
        url: "#forth-level-header",
      },
      {
        label: "Fifth Level Header",
        url: "#fifth-level-header",
      },
      {
        label: "Sixth Level Header",
        url: "#sixth-level-header",
      },
    ],
  },
];

const breadcrumbItems = [{ label: "Home", url: "" }];

const content = (
  <React.Fragment>
    <h1>First level header</h1>
    <h2>Second level header</h2>
    <h3>Third level header</h3>
    <h4>Fouth level header</h4>
    <h5>Fifth level header</h5>
    <h6>Sixth level header</h6>
    <hr />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iste
      repellendus reprehenderit ut at quidem nobis officiis molestias? Unde
      iusto odio quaerat dicta omnis consectetur fugit. Vero dolor fugiat
      accusamus eius. Odit quisquam repellat in deleniti neque qui rerum
      recusandae necessitatibus voluptates sequi, nisi non voluptas quasi
      assumenda veniam. Maxime voluptatibus quibusdam delectus expedita ipsum,
      veniam harum optio asperiores odio aut quaerat voluptate eius accusamus?
      Exercitationem amet vel aspernatur praesentium numquam expedita architecto
      consectetur, nemo odit eveniet recusandae nesciunt quasi itaque possimus
      quibusdam officiis placeat nostrum nihil molestias quis nobis sequi? Id
      illum neque iusto incidunt, nemo magnam excepturi perferendis.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iste
      repellendus reprehenderit ut at quidem nobis officiis molestias? Unde
      iusto odio quaerat dicta omnis consectetur fugit. Vero dolor fugiat
      accusamus eius. Odit quisquam repellat in deleniti neque qui rerum
      recusandae necessitatibus voluptates sequi, nisi non voluptas quasi
      assumenda veniam. Maxime voluptatibus quibusdam delectus expedita ipsum,
      veniam harum optio asperiores odio aut quaerat voluptate eius accusamus?
      Exercitationem amet vel aspernatur praesentium numquam expedita architecto
      consectetur, nemo odit eveniet recusandae nesciunt quasi itaque possimus
      quibusdam officiis placeat nostrum nihil molestias quis nobis sequi? Id
      illum neque iusto incidunt, nemo magnam excepturi perferendis.
    </p>
    <hr />
    <p>
      This is an <a href="/">internal</a> hyperlink
    </p>
    <p>
      This is an <a href="https://google.co.uk">external</a> hyperlink
    </p>
    <p>
      This is an <a href="mailto:someone@somedomain.com">mailto</a> hyperlink
    </p>
    <p>
      This is an <a href="tel:01234567890">tel</a> hyperlink
    </p>
    <p>
      <del>This line of text is meant to be treated as deleted text.</del>
    </p>
    <p>
      <strong>This line rendered as bold text</strong>
    </p>
    <p>
      <em>This line rendered as italicized text.</em>
    </p>
    <p>
      This line of text includes <code>inline</code> code
    </p>

    <hr />

    <ul>
      <li>In fermentum leo eu lectus mollis quis dictum mi aliquet.</li>
      <li>Morbi eu nulla lobortis, lobortis est in, fringilla felis.</li>
      <li>
        Aliquam nec felis in sapien venenatis viverra fermentum nec lectus.
      </li>
      <li>Ut non enim metus.</li>
    </ul>

    <ol>
      <li>Donec blandit a lorem id convallis.</li>
      <li>Cras gravida arcu at diam gravida gravida.</li>
      <li>Integer in volutpat libero.</li>
      <li>Donec a diam tellus.</li>
      <li>Aenean nec tortor orci.</li>
      <li>Quisque aliquam cursus urna, non bibendum massa viverra eget.</li>
      <li>Vivamus maximus ultricies pulvinar.</li>
    </ol>

    <hr />

    <blockquote>
      <p>
        Ut venenatis, nisl scelerisque sollicitudin fermentum, quam libero
        hendrerit ipsum, ut blandit est tellus sit amet turpis. Id illum neque
        iusto incidunt, nemo magnam excepturi perferendis.
      </p>
    </blockquote>

    <hr />

    <pre>
      <code>
        {`<!-- HTML -->
<article>
  <p>This is some example HTML</p>
</article>`}
      </code>
    </pre>

    <hr />

    <p>
      <strong>Long string of text that needs breaking:</strong>
      <br />
      Lorem/ipsum/dolor/sit/amet/consectetur/adipisicing/elit/dolore/doloremque/obcaecati/eveniet/laboriosam/et/eos/deleniti
    </p>

    <hr />

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Product Description</th>
          <th>Available to Purchase</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas
            dolorum quasi illo.
          </td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>3</td>
          <td>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
            doloremque obcaecati eveniet laboriosam et, eos deleniti.
          </td>
          <td>No</td>
        </tr>
      </tbody>
    </table>

    <hr />
  </React.Fragment>
);

const pageTitle = "Documentation View";

const Template = (args) => {
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
      />
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
              title={pageTitle}
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
};

Template.args = {
  loading: false,
  fetching: false,
};

export const Loading = Template.bind({});
Loading.args = {
  ...Template.args,
  loading: true,
};

export const Fetching = Template.bind({});
Fetching.args = {
  ...Template.args,
  fetching: true,
};

export const Loaded = Template.bind({});
Loaded.args = {
  ...Template.args,
};
