import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "../components/Forms/RegisterForm";
import LoginForm from "../components/Forms/LoginForm";

import { InLineLoader } from "../components/InlineLoader/InlineLoader";
import {
  PRODUCTS,
  CATEGORY,
  ORDERS,
  CUSTOMERS,
  COUPONS,
  SETTINGS,
  LOGIN,
  PRODUCTSDETAIL
} from "../settings/constants";
import { PrivateRoute } from "./PrivateRoute";
import ProductDetail from "../containers/Products/ProductDetail";
const SectionWrapperRouter = lazy(() =>
  import("../components/Sections/SectionWrapperRouter")
);

const Login = lazy(() => import("../containers/Login/Login"));
const Layout = lazy(() => import("../containers/Layout/Layout"));
const Dashboard = lazy(() => import("../containers/Dashboard/Dashboard"));
const Products = lazy(() => import("../containers/Products/Products"));
const Category = lazy(() => import("../containers/Category/Category"));
const CategoryDetail = lazy(() =>
  import("../containers/Category/CategoryDetail")
);
const Orders = lazy(() => import("../containers/Orders/Orders"));
const Customers = lazy(() => import("../containers/Customers/Customers"));
const CustomerDetail = lazy(() =>
  import("../containers/Customers/CustomerDetail")
);
const Coupons = lazy(() => import("../containers/Coupons/Coupons"));
const SiteSettings = lazy(() =>
  import("../containers/SiteSettings/SiteSettings")
);
const Settings = lazy(() => import("../containers/Settings/Settings"));
const Staff = lazy(() => import("../containers/Staff/Staff"));

export const Routing = () => {
  return (
    <Routes>
      <Route
        path="/register"
        element={
          <Suspense fallback={<InLineLoader />}>
            <Login subtitle="Register">
              <RegisterForm />
            </Login>
          </Suspense>
        }
      />
      <Route
        path={LOGIN}
        element={
          <Suspense fallback={<InLineLoader />}>
            <Login subtitle="Log in to admin">
              <LoginForm />
            </Login>
          </Suspense>
        }
      />
      {/* _____________General Admin Router init_________ */}
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

        {/* ____________________Route Products Init_______________________*/}
        <Route
          path={PRODUCTS}
          element={
            <Suspense fallback={<InLineLoader />}>
              <SectionWrapperRouter />
            </Suspense>
          }
        >

          <Route
            index
            element={
              <Suspense fallback={<InLineLoader />}>
                <Products />
              </Suspense>
            }
          />

          <Route
            path=":productId"
            element={
              <Suspense fallback={<InLineLoader />}>
                <ProductDetail/>
              </Suspense>
            }
          >
          </Route>

          {/* ____________________Route Products finish_______________________*/}
          {/* ____________________Route Category Init_______________________*/}
          <Route
            path={CATEGORY}
            element={
              <PrivateRoute>
                <Suspense fallback={<InLineLoader />}>
                  <SectionWrapperRouter />
                </Suspense>
              </PrivateRoute>
            }
          />
            <Route
              path=":categoryId"
              element={
                <Suspense fallback={<InLineLoader />}>
                  <CategoryDetail />
                </Suspense>
              }
            />
            <Route
              index
              element={
                <Suspense fallback={<InLineLoader />}>
                  <Category />
                </Suspense>
              }
            />
            </Route>
          {/* ____________________Route Category Finish_______________________*/}
          {/* ____________________Route Customer Init_______________________*/}
          <Route
            path={CUSTOMERS}
            element={
              <PrivateRoute>
                <Suspense fallback={<InLineLoader />}>
                  <SectionWrapperRouter />
                </Suspense>
              </PrivateRoute>
            }
          >
            <Route
              path={CATEGORY}
              element={
                <Suspense fallback={<InLineLoader />}>
                  <Customers />
                </Suspense>
              }
            />
            <Route
              path=":customerId"
              element={
                <Suspense fallback={<InLineLoader />}>
                  <CustomerDetail />
                </Suspense>
              }
            />
          </Route>
          {/* ____________________Route Customer Finish_______________________*/}
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
          {/* ____________________Route Settings Init_______________________*/}
          <Route
            path={SETTINGS}
            element={
              <Suspense fallback={<InLineLoader />}>
                <SectionWrapperRouter />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<InLineLoader />}>
                  <Settings />
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
          {/* _____________Settings Router finish_________ */}
        </Route>
        {/* _____________General Admin Router finish_________ */}
    </Routes>
  );
};
