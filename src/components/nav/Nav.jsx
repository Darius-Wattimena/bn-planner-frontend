import React, {useState} from "react";
import {Menu, MenuItem} from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const homeName = "home";
const beatmapsName = "beatmaps";

const Nav = () => {
  let history = useHistory();
  const [selected, setSelected] = useState("");

  function handleNavClick(itemName, location) {
    setSelected(itemName);
    history.push(location);
  }

  return (
    <Menu pointing secondary>
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
    </Menu>
  )
};

export default Nav