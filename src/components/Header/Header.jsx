import React from "react";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { MenuIcon } from "../../assets/icons/MenuIcon";
import { UserIcon } from "../../assets/icons/UserIcon";
import { UserAvatar } from "../../assets/icons/UserAvatar";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import Logoimage from "../../assets/image/fontaine.svg";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
} from "@chakra-ui/react";

import { useAuth } from "../../auth/auth";

export const Header = ({ onOpenSidebar }) => {
  let navigate = useNavigate();
  let auth = useAuth();

  const handleLogout = () => {
    auth.signout(() => navigate("/login"));
  };
  return (
    <div className="header">
      <div className="header__left">
        <div className="header__menu_button">
          <Button
            bg={"transparent"}
            onClick={onOpenSidebar}
            _focus={{ outline: "none" }}
          >
            <MenuIcon />
          </Button>
        </div>
        <Link to="/" className="header__logo">
          <img src={Logoimage} alt="Fontaine-logo" />
        </Link>
      </div>

      <div className="header__right">
        <button className="add_products">Add Products</button>
        <Menu>
          <MenuButton
            as={Button}
            p={0}
            borderRadius="100"
            bg="transparent"
            _focus={{ outline: "none" }}
            color="#b4b4b4"
          >
            <UserIcon />
          </MenuButton>
          <MenuList>
            <MenuGroup title="Profile">
              <MenuItem icon={<UserAvatar />}>My Account</MenuItem>
              <MenuItem icon={<LogoutIcon />} onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};
