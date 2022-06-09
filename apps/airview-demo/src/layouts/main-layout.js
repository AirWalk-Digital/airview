import React, { useMemo } from "react";
import { TopBar } from "airview-ui";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { EntrySelector } from "../features";

export function MainLayout() {
  // const { collection, entry } = useParams();
  // const navigate = useNavigate();

  // const value = useMemo(() => {
  //   if (!collection || !entry) return "";

  //   return `/${collection}/${entry}`;
  // }, [collection, entry]);

  // const handleOnChange = (selection) => {
  //   navigate(selection, { replace: true });
  // };

  return (
    <React.Fragment>
      <TopBar onMenuButtonClick={() => {}} title="AirviewCMS Demo" />
      <Outlet />
    </React.Fragment>
  );

  // return (
  //   <div style={{ padding: "48px 16px 16px 16px" }}>
  //     <EntrySelector value={value} onChange={handleOnChange} />
  //     <Outlet />
  //   </div>
  // );
}
