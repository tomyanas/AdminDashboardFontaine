import React from "react";
import {
  DASHBOARD,
  PRODUCTS,
  CATEGORY,
  ORDERS,
  CUSTOMERS,
  COUPONS,
  SETTINGS,
} from "../../settings/constants";
import { DashboardIcon } from "../../assets/icons/DashboardIcon";
import { ProductIcon } from "../../assets/icons/ProductIcon";
import { SidebarCategoryIcon } from "../../assets/icons/SidebarCategoryIcon";
import { OrderIcon } from "../../assets/icons/OrderIcon";
import { CustomerIcon } from "../../assets/icons/CustomerIcon";
import { CouponIcon } from "../../assets/icons/CouponIcon";
import { SettingIcon } from "../../assets/icons/SettingIcon";
import { NavLink } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
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
    <Box
      as="aside"
      width={{ base: "220px", md: "270px" }}
      minH="100%"
      display="flex"
      flexShrink="0"
      bg="#ffffff"
      flexDirection="column"
      boxShadow="1px 0 3px #0003"
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        padding={{ base: "35px 0", lg: "50px 0" }}
        overflowY="auto"
      >
        {sidebarMenus.map((menu, index) => (
          <NavLink
            to={"/" + menu.path}
            key={index}
            className="sidebar__navigation_navlinks"
          >
            {menu.icon ? (
              <Text
                as="span"
                width="1rem"
                marginRight="1rem"
                display="flex"
                alignItems="center"
              >
                {menu.icon}
              </Text>
            ) : (
              ""
            )}
            {menu.name}
          </NavLink>
        ))}
      </Box>
    </Box>
  );
};
