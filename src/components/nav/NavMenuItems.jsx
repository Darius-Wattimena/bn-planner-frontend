import React from "react";
import {Image, Menu, MenuItem} from "semantic-ui-react";
import {ENV} from "../../Settings";
import {getUserWithId} from "../../util/UserUtil";
import UserAvatar from "../user/UserAvatar";

const NavMenuItems = ({users, isSidebar, hasHiddenPerms, handleNavClick, selected, homeName, beatmapsName, rankedName, gravedName, usersName, contestName, moddingMapName, userId, loginName, osuLoginUrl}) => {

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
      <RightMenu users={users} userId={userId} selected={selected} osuLoginUrl={osuLoginUrl} loginName={loginName} isSidebar={isSidebar} />
    </>
  )
}

const RightMenu = ({isSidebar, userId, users, selected, loginName, osuLoginUrl}) => {
  let userDetails

  if (userId === 0) {
    userDetails = null
  } else {
    userDetails = getUserWithId(users, userId)
  }

  if (isSidebar && isSidebar === true) {
    return (
      <>
        {ENV.is_dev && ENV.is_dev === true &&
          <MenuItem>
            DEVELOP BACK-END!
          </MenuItem>
        }
        {userId === 0 &&
          <MenuItem
            name={loginName}
            active={selected === loginName}
            onClick={() => window.location.href = osuLoginUrl}
          >
            Login with osu! account
          </MenuItem>
        }
        {userDetails &&
        <MenuItem>
          <Image avatar src={userDetails.profilePictureUri}/>
          Welcome {getUserWithId(users, userId).osuName}!
        </MenuItem>
        }
      </>
    )
  } else {
    return (
      <Menu.Menu position='right'>
        {ENV.is_dev && ENV.is_dev === true &&
          <MenuItem>
            DEVELOP BACK-END!
          </MenuItem>
        }
        {userId === 0 &&
          <MenuItem
            name={loginName}
            active={selected === loginName}
            onClick={() => window.location.href = osuLoginUrl}
          >
            Login with osu! account
          </MenuItem>
        }
        {userDetails &&
          <MenuItem>
            <Image avatar src={userDetails.profilePictureUri}/>
            Welcome {getUserWithId(users, userId).osuName}!
          </MenuItem>
        }
      </Menu.Menu>
    )
  }
}

export default NavMenuItems