import {getReadableRole, getUserWithId} from "../../../util/UserUtil";
import {formatOsuLinks} from "../../../util/DiscussionUtil";
import React from "react";
import DiscussionAuthor from "./DiscussionAuthor";

const DiscussionItemResponse = ({response, users}) => {
  let authorDetails = getUserWithId(users, response.authorOsuId)
  let authorRole = getReadableRole(authorDetails.role)

  let formattedText = formatOsuLinks(response.content)

  return (
    <div className={"beatmap-discussion-item"}>
      <DiscussionAuthor authorDetails={authorDetails} authorRole={authorRole} />
      <div className={"beatmap-discussion-content"}>
        {formattedText}
      </div>
    </div>
  )
}

export default DiscussionItemResponse