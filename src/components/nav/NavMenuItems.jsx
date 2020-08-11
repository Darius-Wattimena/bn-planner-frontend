import React from "react";
import {Menu, MenuItem} from "semantic-ui-react";

const NavMenuItems = ({hasHiddenPerms, handleNavClick, selected, homeName, beatmapsName, rankedName, gravedName, usersName, contestName, moddingMapName, userId, loginName, osuLoginUrl}) => {

  return (
    <>
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
        In Progress
      </MenuItem>
      <MenuItem
        name={rankedName}
        active={selected === rankedName}
        onClick={() => handleNavClick(rankedName, "/ranked")}
      >
        Ranked
      </MenuItem>
      <MenuItem
        name={gravedName}
        active={selected === gravedName}
        onClick={() => handleNavClick(gravedName, "/graved")}
      >
        Graved
      </MenuItem>
      <MenuItem
        name={usersName}
        active={selected === usersName}
        onClick={() => handleNavClick(usersName, "/users")}
      >
        Users
      </MenuItem>
      {hasHiddenPerms &&
      <>
        <MenuItem
          name={contestName}
          active={selected === contestName}
          onClick={() => handleNavClick(contestName, "/contests")}
        >
          Contests
        </MenuItem>
        <MenuItem
          name={moddingMapName}
          active={selected === moddingMapName}
          onClick={() => handleNavClick(moddingMapName, "/modding/maps")}
        >
          Modding
        </MenuItem>
      </>
      }
      {userId === 0 &&
      <Menu.Menu position='right'>
        <MenuItem
          name={loginName}
          active={selected === loginName}
          onClick={() => window.location.href = osuLoginUrl}
        >
          Login with osu! account
        </MenuItem>
      </Menu.Menu>
      }
    </>
  )
}

export default NavMenuItems