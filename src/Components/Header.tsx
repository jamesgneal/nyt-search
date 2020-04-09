import React from "react";
import { Navbar, Icon } from "react-materialize";
import "materialize-css";

export const Header = () => {
  return (
    <Navbar
      alignLinks="left"
      brand={
        <a
          className="brand-logo"
          href="https://www.linkedin.com/in/gneal/"
          target="_blank"
        >
          New York Times Searcher
        </a>
      }
      centerLogo
      id="mobile-nav"
      menuIcon={<Icon>menu</Icon>}
      options={{
        draggable: true,
        edge: "left",
        inDuration: 250,
        outDuration: 200,
        preventScrolling: true,
      }}
    ></Navbar>
  );
};
