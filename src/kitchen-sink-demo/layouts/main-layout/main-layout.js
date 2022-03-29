import React from "react";
import { Link, Outlet } from "react-router-dom";
import { PageSelector } from "../../features";

import styles from "./main-layout.module.scss";

export function MainLayout() {
  return (
    <div className={styles.root}>
      <header>
        <Link to="/" className={styles.homeLink}>
          <h1>Airview Demo</h1>
        </Link>

        <PageSelector />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
