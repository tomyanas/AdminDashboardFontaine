import React from "react";
import { Route, Routes } from "react-router-dom";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<div>hola</div>} />
    </Routes>
  );
};
