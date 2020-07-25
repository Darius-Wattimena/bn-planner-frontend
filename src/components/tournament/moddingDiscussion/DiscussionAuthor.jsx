import {Image, Label} from "semantic-ui-react";
import React from "react";

const DiscussionAuthor = ({authorDetails, authorRole}) => {
  return (
    <div className={"beatmap-discussion-author"}>
      <div className={"beatmap-discussion-avatar"}>
        <Image className={"beatmap-discussion-avatar-image"} src={authorDetails.profilePictureUri} />
      </div>
      <div className={"beatmap-discussion-username-profile"}>
        <div className={"beatmap-discussion-username " + authorRole.className}>{authorDetails.osuName}</div>
        {authorRole.id !== "OBS" &&
          <Label className={"beatmap-discussion-label " + authorRole.className}>{authorRole.full}</Label>
        }
      </div>
      <div className={"beatmap-discussion-stripe " + authorRole.className} />
    </div>
  )
}

export default DiscussionAuthor