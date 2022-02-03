import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../containers/Layout/Layout";
import { Dashboard } from "../containers/Dashboard/Dashboard";
import { Products } from "../containers/Products/Products";
import { Category } from "../containers/Category/Category";
import { Orders } from "../containers/Orders/Orders";
import { Customers } from "../containers/Customers/Customers";
import { Coupons } from "../containers/Coupons/Coupons";
import { Settings } from "../containers/Settings/Settings";

import {
  DASHBOARD,
  PRODUCTS,
  CATEGORY,
  ORDERS,
  CUSTOMERS,
  COUPONS,
  SETTINGS,
} from "../settings/constants";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path={PRODUCTS} element={<Products />} />
        <Route path={CATEGORY} element={<Category />} />
        <Route path={ORDERS} element={<Orders />} />
        <Route path={CUSTOMERS} element={<Customers />} />
        <Route path={COUPONS} element={<Coupons />} />
        <Route path={SETTINGS} element={<Settings />} />
      </Route>
    </Routes>
  );
};
