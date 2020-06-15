import React from "react";
import {Image} from "semantic-ui-react";
import {getReadableRole} from "../../util/UserUtil";

const UserAvatar = ({nominated, userDetails}) => {
  if (userDetails) {
    let roleDetails = getReadableRole(userDetails.role);
    let className;

    if (nominated) {
      className = "nominated user-avatar " + roleDetails.className + "-text"
    } else {
      className = "user-avatar " + roleDetails.className + "-text"
    }

    return (
      <div className={className}>
        <Image avatar src={userDetails.profilePictureUri}/>
        {userDetails.osuName}
      </div>
    )
  }
};

export default UserAvatar