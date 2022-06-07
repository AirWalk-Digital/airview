import React from "react";
import { Link } from "react-router-dom";

export function NotFoundView() {
  return (
    <div>
      <h1>404: Not Found</h1>
      <Link to="/">Home</Link>
    </div>
  );
}
