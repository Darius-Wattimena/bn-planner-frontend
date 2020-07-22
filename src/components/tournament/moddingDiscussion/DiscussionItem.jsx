import React, {useState} from "react";
import {getReadableRole, getUserWithId} from "../../../util/UserUtil";
import {formatOsuLinks} from "../../../util/DiscussionUtil";
import {Icon} from "semantic-ui-react";
import DiscussionAuthor from "./DiscussionAuthor";
import DiscussionItemResponse from "./DiscussionItemResponse";
import DiscussionItemResponseBox from "./DiscussionItemResponseBox";

const DiscussionItem = ({discussion, users, userId, query}) => {
  const [isWritingReply, setIsWritingReply] = useState(false)

  let moddingComment = discussion.moddingComment
  let authorDetails = getUserWithId(users, moddingComment.authorOsuId)
  let authorRole = getReadableRole(authorDetails.role)

  let formattedText = formatOsuLinks(moddingComment.content)

  return (
    <div className={"beatmap-discussion-group"}>
      <div className={"beatmap-discussion-status"}>
        <Icon name={moddingComment.resolved ? "check" : "close"} color={moddingComment.resolved ? "green" : "red"} />
        {moddingComment.osuTimestamp}
      </div>
      <div className={moddingComment.resolved ? "beatmap-discussion-item-group beatmap-discussion-resolved" : "beatmap-discussion-item-group"}>
        <div className={"beatmap-discussion-item-top"}>
          <DiscussionAuthor authorDetails={authorDetails} authorRole={authorRole} />
          <div className={"beatmap-discussion-content"}>
            {formattedText}
          </div>
        </div>
        {discussion.moddingResponses && discussion.moddingResponses.map((response, index) => {
          return <DiscussionItemResponse key={index} response={response} users={users} />
        })}
        <DiscussionItemResponseBox moddingComment={moddingComment} isWriting={isWritingReply} setIsWriting={setIsWritingReply} userId={userId} users={users} query={query} />
      </div>
    </div>
  )
}

export default DiscussionItem