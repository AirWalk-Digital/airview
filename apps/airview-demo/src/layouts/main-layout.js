import React, { useMemo } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useHandleOnContentCreation } from "airview-cms";
import { EntrySelector } from "../features";

export function MainLayout() {
  const { collection, entry } = useParams();
  const navigate = useNavigate();
  useHandleOnContentCreation(handleOnContentCreation);

  const value = useMemo(() => {
    if (!collection || !entry) return "";

    return `/${collection}/${entry}`;
  }, [collection, entry]);

  const handleOnChange = (selection) => {
    navigate(selection, { replace: true });
  };

  return (
    <div style={{ padding: "48px 16px 16px 16px" }}>
      <EntrySelector value={value} onChange={handleOnChange} />
      <Outlet />
    </div>
  );
}

function handleOnContentCreation(args) {
  console.log(args);
}
