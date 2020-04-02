import React, {useState} from "react";
import {Icon, Menu, MenuItem} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import catchLogo from "../../assets/catch.svg"
import "./Nav.css"

const homeName = "home";
const beatmapsName = "beatmaps";
const usersName = "users";
const loginName = "login";
const logoutName = "logout";
const profileName = "profile";

const Nav = () => {
  let history = useHistory();
  const [selected, setSelected] = useState("");

  function handleNavClick(itemName, location) {
    setSelected(itemName);
    history.push(location);
  }

  return (
    <nav className={"nav-header"}>
      <Menu secondary inverted>
        <MenuItem>
          <img src={catchLogo}  alt={""}/>
        </MenuItem>
        <MenuItem
          name={homeName}
          active={selected === homeName}
          onClick={() => handleNavClick(homeName, "/")}
        >
          Home
        </MenuItem>
        <MenuItem
          name={beatmapsName}
          active={selected === beatmapsName}
          onClick={() => handleNavClick(beatmapsName, "/beatmaps")}
        >
          Beatmaps
        </MenuItem>
        <MenuItem
          name={usersName}
          active={selected === usersName}
          onClick={() => handleNavClick(usersName, "/users")}
        >
          Users
        </MenuItem>
        <LoginMenu loggedIn={true} selected={selected} handleNavClick={handleNavClick} />
      </Menu>
    </nav>
  )
};

const LoginMenu = (loggedIn, selected, handleNavClick) => {
  if (loggedIn) {
    return (
      <Menu.Menu position='right'>
        <MenuItem
          name={profileName}
          active={selected === profileName}
          onClick={() => handleNavClick(profileName, "/profile")}
        >
          My Profile
        </MenuItem>
        <MenuItem
          name={logoutName}
          active={selected === logoutName}
          onClick={() => handleNavClick(logoutName, "/logout")}
        >
          Logout
        </MenuItem>
      </Menu.Menu>
    )
  } else {
    return (
      <Menu.Menu position='right'>
        <MenuItem
          name={loginName}
          active={selected === loginName}
          onClick={() => handleNavClick(loginName, "/login")}
        >
          Login
        </MenuItem>
      </Menu.Menu>
    )
  }
};

export default Nav