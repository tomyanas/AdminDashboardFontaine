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
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";

const sidebarMenus = [
  {
    name: "Metricas",
    path: DASHBOARD,
    icon: <DashboardIcon />,
  },
  {
    name: "Productos",
    path: PRODUCTS,
    icon: <ProductIcon />,
  },
  {
    name: "Categorias",
    path: CATEGORY,
    icon: <SidebarCategoryIcon />,
  },
  {
    name: "Pedidos",
    path: ORDERS,
    icon: <OrderIcon />,
  },
  {
    name: "Clientes",
    path: CUSTOMERS,
    icon: <CustomerIcon />,
  },
  {
    name: "Cupones",
    path: COUPONS,
    icon: <CouponIcon />,
  },
  {
    name: "Configuracion",
    path: SETTINGS,
    icon: <SettingIcon />,
  },
];

const SonNavLink = ({ path, icon, name }) => {
  return (
    <NavLink
      to={"/" + path}
      className={useColorModeValue("nav-link-light", "nav-link-dark")}
    >
      {icon && <Text
        as="span"
        width="1.3rem"
        height="1.3rem"
        marginRight="1rem"
        display="flex"
        alignItems="center"
        className="icon_navlink"
      >
        {icon}
      </Text>}
      <Text
        color={useColorModeValue("#161f6a", "gray.100")}
        as="span"
        fontSize="lg"
        fontWeight={500}
      >
        {name}
      </Text>

    </NavLink>

  )
};

export const Sidebar = () => {

  return (
    <Box
      as="aside"
      width={{ base: "230px", md: "270px" }}
      pl="10px"
      minH="100%"
      display="flex"
      flexShrink="0"
      bg={useColorModeValue("white", "gray.900")}
      flexDirection="column"
      boxShadow={useColorModeValue("1px 0 3px #0003", "1px 0 2px #fff1")}
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        padding={{ base: "35px 0", lg: "50px 0" }}
        overflowY="auto"
        color={useColorModeValue("gray.800", "gray.100")}
        className={useColorModeValue("sidebar_light", "sidebar_dark")}

      >
        {sidebarMenus.map((menu, index) => (
          <SonNavLink path={menu.path} icon={menu.icon} name={menu.name} key={index} />))}
      </Box>
      <Box ml="auto" p="1rem 0.5rem" >
        <DarkModeSwitch display={{ base: "block", sm: "none" }} />
      </Box>
      
    </Box>
  );
};
