import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { InLineLoader } from "../components/InlineLoader/InlineLoader";
// import { Layout } from "../containers/Layout/Layout";
// import { Dashboard } from "../containers/Dashboard/Dashboard";
// import { Products } from "../containers/Products/Products";
// import { Category } from "../containers/Category/Category";
// import { Orders } from "../containers/Orders/Orders";
// import { Customers } from "../containers/Customers/Customers";
// import { Coupons } from "../containers/Coupons/Coupons";
// import { Settings } from "../containers/Settings/Settings";
import {
  PRODUCTS,
  CATEGORY,
  ORDERS,
  CUSTOMERS,
  COUPONS,
  SETTINGS,
} from "../settings/constants";

const LoginRegister = lazy(() => import( "../containers/LoginRegister/LoginRegister"));
const Layout = lazy(() => import("../containers/Layout/Layout"));
const Dashboard = lazy(() => import("../containers/Dashboard/Dashboard"));
const Products = lazy(() => import("../containers/Products/Products"));
const Category = lazy(() => import("../containers/Category/Category"));
const Orders = lazy(() => import("../containers/Orders/Orders"));
const Customers = lazy(() => import("../containers/Customers/Customers"));
const Coupons = lazy(() => import("../containers/Coupons/Coupons"));
const Settings = lazy(() => import("../containers/Settings/Settings"));

export const Routing = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense fallback={<InLineLoader />}>
            <LoginRegister />
          </Suspense>
        }
      />
      <Route
        path="/"
        element={
          <Suspense fallback={<InLineLoader />}>
            <Layout />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<InLineLoader />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path={PRODUCTS}
          element={
            <Suspense fallback={<InLineLoader />}>
              <Products />
            </Suspense>
          }
        />
        <Route
          path={CATEGORY}
          element={
            <Suspense fallback={<InLineLoader />}>
              <Category />
            </Suspense>
          }
        />
        <Route
          path={ORDERS}
          element={
            <Suspense fallback={<InLineLoader />}>
              <Orders />
            </Suspense>
          }
        />
        <Route
          path={CUSTOMERS}
          element={
            <Suspense fallback={<InLineLoader />}>
              <Customers />
            </Suspense>
          }
        />
        <Route
          path={COUPONS}
          element={
            <Suspense fallback={<InLineLoader />}>
              <Coupons />
            </Suspense>
          }
        />
        <Route
          path={SETTINGS}
          element={
            <Suspense fallback={<InLineLoader />}>
              <Settings />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};
