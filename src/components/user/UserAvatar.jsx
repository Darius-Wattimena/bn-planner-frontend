import React from "react";
import {Image} from "semantic-ui-react";
import {getReadableRole} from "../../util/UserUtil";

const UserAvatar = ({userDetails}) => {
  if (userDetails) {
    let roleDetails = getReadableRole(userDetails.role);
    return (
      <div className={"user-avatar " + roleDetails.color + "-text"}>
        <Image avatar src={userDetails.profilePictureUri}/>
        {userDetails.osuName}
      </div>
    )
  }
};

export default UserAvatar