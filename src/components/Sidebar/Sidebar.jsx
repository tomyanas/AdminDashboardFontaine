import React from "react";
import {
  DASHBOARD,
  PRODUCTS,
  CATEGORY,
  ORDERS,
  CUSTOMERS,
  COUPONS,
  SETTINGS,
  PRODUCTSDETAIL,
} from "../../settings/constants";
import { DashboardIcon } from "../../assets/icons/DashboardIcon";
import { ProductIcon } from "../../assets/icons/ProductIcon";
import { SidebarCategoryIcon } from "../../assets/icons/SidebarCategoryIcon";
import { OrderIcon } from "../../assets/icons/OrderIcon";
import { CustomerIcon } from "../../assets/icons/CustomerIcon";
import { CouponIcon } from "../../assets/icons/CouponIcon";
import { SettingIcon } from "../../assets/icons/SettingIcon";
import { NavLink } from "react-router-dom";
import './Sidebar.scss'
const sidebarMenus = [
  {
    name: "Dashboard",
    path: DASHBOARD,
    icon: <DashboardIcon />,
  },
  {
    name: "Products",
    path: PRODUCTS,
    icon: <ProductIcon />,
  },
  {
    name: "Products Details",
    path: PRODUCTSDETAIL,
    icon: <ProductIcon />,
  },
  {
    name: "Category",
    path: CATEGORY,
    icon: <SidebarCategoryIcon />,
  },
  {
    name: "Orders",
    path: ORDERS,
    icon: <OrderIcon />,
  },
  {
    name: "Customers",
    path: CUSTOMERS,
    icon: <CustomerIcon />,
  },
  {
    name: "Coupons",
    path: COUPONS,
    icon: <CouponIcon />,
  },
  {
    name: "Settings",
    path: SETTINGS,
    icon: <SettingIcon />,
  },
];

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__navigation">
        {sidebarMenus.map((menu, index) => (
          <NavLink
            to={"/"+menu.path}
            key={index}
            className="sidebar__navigation_navlinks"
          >
            {menu.icon ? <span>{menu.icon}</span> : ""}
            {menu.name}

          </NavLink>
        ))}
      </div>
    </aside>
  );
};
