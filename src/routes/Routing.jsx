import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../auth/AuthProvider";

import { InLineLoader } from "../components/InlineLoader/InlineLoader";
import {
  PRODUCTS,
  CATEGORY,
  ORDERS,
  CUSTOMERS,
  COUPONS,
  SETTINGS,
  LOGIN,
} from "../settings/constants";
import { PrivateRoute } from "./PrivateRoute";

const LoginRegister = lazy(() =>
  import("../containers/LoginRegister/LoginRegister")
);
const Layout = lazy(() => import("../containers/Layout/Layout"));
const Dashboard = lazy(() => import("../containers/Dashboard/Dashboard"));
const Products = lazy(() => import("../containers/Products/Products"));
const Category = lazy(() => import("../containers/Category/Category"));
const Orders = lazy(() => import("../containers/Orders/Orders"));
const Customers = lazy(() => import("../containers/Customers/Customers"));
const Coupons = lazy(() => import("../containers/Coupons/Coupons"));
const Settings = lazy(() => import("../containers/Settings/Settings"));
const SiteSettings = lazy(() => import("../containers/SiteSettings/SiteSettings"));
const SettingsOptions = lazy(() =>
  import("../containers/Settings/SettingsOptions")
);
const Staff = lazy(() => import("../containers/Staff/Staff"));

export const Routing = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path={LOGIN}
          element={
            <Suspense fallback={<InLineLoader />}>
              <LoginRegister />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Suspense fallback={<InLineLoader />}>
                <Layout />
              </Suspense>
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <PrivateRoute>
                <Suspense fallback={<InLineLoader />}>
                  <Dashboard />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path={PRODUCTS}
            element={
              <PrivateRoute>
                <Suspense fallback={<InLineLoader />}>
                  <Products />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path={CATEGORY}
            element={
              <PrivateRoute>
                <Suspense fallback={<InLineLoader />}>
                  <Category />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path={ORDERS}
            element={
              <PrivateRoute>
                <Suspense fallback={<InLineLoader />}>
                  <Orders />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path={CUSTOMERS}
            element={
              <PrivateRoute>
                <Suspense fallback={<InLineLoader />}>
                  <Customers />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path={COUPONS}
            element={
              <PrivateRoute>
                <Suspense fallback={<InLineLoader />}>
                  <Coupons />
                </Suspense>
              </PrivateRoute>
            }
          />
          {/* ____________________Route Settings _______________________*/}
          <Route
            path={SETTINGS}
            element={
              <Suspense fallback={<InLineLoader />}>
                <Settings />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<InLineLoader />}>
                  <SettingsOptions />
                </Suspense>
              }
            />
            <Route
              path="site-settings"
              element={
                <Suspense fallback={<InLineLoader />}>
                  <SiteSettings />
                </Suspense>
              }
            />
            <Route
              path="staff"
              element={
                <Suspense fallback={<InLineLoader />}>
                  <Staff />
                </Suspense>
              }
            />
          </Route>
          {/* _____ fin Route Settings */}
        </Route>
      </Routes>
    </AuthProvider>
  );
};
