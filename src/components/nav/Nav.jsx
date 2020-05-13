import React, {useState} from "react";
import {Menu, MenuItem} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import catchLogo from "../../assets/catch.svg"
import "./Nav.css"
import {ENV} from "../../Settings";

const homeName = "home";
const beatmapsName = "beatmaps";
const usersName = "users";
const loginName = "login";
const profileName = "profile";

const Nav = ({userId}) => {
  let history = useHistory();
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
          selected={selected}
          handleNavClick={handleNavClick}
          userId={userId}
        />
      </Menu>
    </nav>
  )
};

const LoginMenu = ({selected, handleNavClick, userId}) => {
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
      </Menu.Menu>
    )
  } else {
    const osuLoginUrl = "https://osu.ppy.sh/oauth/authorize?response_type=code&client_id=" + ENV.osu.id +"&redirect_uri=" + ENV.osu.redirect + "&response_type=code";
    return (
      <Menu.Menu position='right'>
        <MenuItem
          name={loginName}
          active={selected === loginName}
          onClick={() => window.location.href = osuLoginUrl}
        >
          Login
        </MenuItem>
      </Menu.Menu>
    )
  }
};

export default Nav