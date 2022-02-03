import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../containers/Layout/Layout";


export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>} />
    </Routes>
  );
};
