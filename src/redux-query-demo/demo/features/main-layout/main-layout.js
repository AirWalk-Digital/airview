import React from "react";
import { Link, Outlet } from "react-router-dom";
import { PageSelector } from "./page-selector";

export function MainLayout() {
  return (
    <div>
      <header>
        <Link to="/">
          <h1>Airview Navigation Demo</h1>
        </Link>

        <PageSelector />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
