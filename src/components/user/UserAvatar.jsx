import React from "react";
import {Image} from "semantic-ui-react";

const UserAvatar = ({userDetails}) => {
  if (userDetails) {
    return (
      <div>
        <Image avatar src={userDetails.profilePictureUri}/>
        {userDetails.osuName}
      </div>
    )
  }
};

export default UserAvatar