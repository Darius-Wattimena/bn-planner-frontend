import React, {useState} from "react";
import {Menu, MenuItem} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import catchLogo from "../../assets/catch.svg"
import "./Nav.css"
import {useCookies} from "react-cookie";
import {basePermissions} from "../../Routes";

const homeName = "home";
const beatmapsName = "beatmaps";
const usersName = "users";
const loginName = "login";
const logoutName = "logout";
const profileName = "profile";

const Nav = ({setLoginOpen, setRegisterOpen, setPermissions, userId}) => {
  let history = useHistory();
  const [cookies, setCookie] = useCookies(['bnplanner_token']);
  const [selected, setSelected] = useState("");

  function handleNavClick(itemName, location) {
    setSelected(itemName);
    history.push(location);
  }

  return (
    <nav className={"nav-header"}>
      <Menu secondary inverted>
        <MenuItem onClick={() => handleNavClick(homeName, "/")}>
          <img src={catchLogo} alt={""}/>
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
        <LoginMenu
          setLoginOpen={setLoginOpen}
          setRegisterOpen={setRegisterOpen}
          selected={selected}
          handleNavClick={handleNavClick}
          setCookie={setCookie}
          setPermissions={setPermissions}
          userId={userId}
        />
      </Menu>
    </nav>
  )
};

const LoginMenu = ({selected, handleNavClick, setLoginOpen, setRegisterOpen, setCookie, setPermissions, userId}) => {
  if (userId !== 0) {
    return (
      <Menu.Menu position='right'>
        <MenuItem
          name={profileName}
          active={selected === profileName}
          onClick={() => handleNavClick(profileName, "/profile/" + userId)}
        >
          Profile
        </MenuItem>
        <MenuItem
          name={logoutName}
          active={selected === logoutName}
          onClick={() => {
            setCookie("bnplanner_token", "");
            setPermissions(basePermissions)
          }}
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
          onClick={() => setRegisterOpen(true)}
        >
          Register
        </MenuItem>
        <MenuItem
          name={loginName}
          active={selected === loginName}
          onClick={() => setLoginOpen(true)}
        >
          Login
        </MenuItem>
      </Menu.Menu>
    )
  }
};

export default Nav