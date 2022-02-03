import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { MenuIcon } from "../../assets/icons/MenuIcon";
import { UserIcon } from "../../assets/icons/UserIcon";
import Logoimage from "../../assets/image/fontaine_m0.png";

export const Header = ({onOpenSidebar}) => {
  return (
    <header className="header">
      <div className="header__left">
        <div className="header__menu_button">
          <Button bg={"transparent"} onClick={onOpenSidebar} >
            <MenuIcon />
          </Button>
        </div>
        <Link to="/" className="header__logo">
          <img src={Logoimage} alt="Fontaine-logo" />
        </Link>
      </div>

      <div className="header__right">
        <button>Add Products</button>
        <div className="header__right_profile">
            <UserIcon/>
        </div >
      </div>
    </header>
  );
};
