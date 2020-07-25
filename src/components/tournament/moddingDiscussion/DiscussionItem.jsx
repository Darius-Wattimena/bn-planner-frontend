import React, {useState} from "react";
import {getReadableRole, getUserWithId} from "../../../util/UserUtil";
import {formatOsuLinks, timestampRegex} from "../../../util/DiscussionUtil";
import {Button, Icon} from "semantic-ui-react";
import DiscussionAuthor from "./DiscussionAuthor";
import DiscussionItemResponse from "./DiscussionItemResponse";
import DiscussionItemResponseBox from "./DiscussionItemResponseBox";
import {useMutation} from "react-fetching-library";
import Api from "../../../resources/Api";
import {useCookies} from "react-cookie";

const DiscussionItem = ({discussion, users, userId, query}) => {
  let moddingComment = discussion.moddingComment

  const [cookies] = useCookies(['bnplanner_osu_access_token'])
  const [isWritingReply, setIsWritingReply] = useState(false)
  const [isEditingComment, setIsEditingComment] = useState(false)
  const [formValues, setFormValues] = useState(moddingComment)
  const {mutate: editMutate} = useMutation(Api.editModdingComment)
  const {mutate: deleteMutate} = useMutation(Api.deleteModdingComment)

  const handleEditSubmit = async (formValues) => {
    const {error: mutateError} = await editMutate(formValues, cookies.bnplanner_osu_access_token, userId)

    if (mutateError) {
      console.log(mutateError)
    } else {
      query()
      resetEdit()
    }
  }

  const handleDeleteSubmit = async () => {
    const {error: mutateError} = await deleteMutate(moddingComment._id, cookies.bnplanner_osu_access_token, userId)

    if (mutateError) {
      console.log(mutateError)
    } else {
      query()
    }
  }

  function resetEdit() {
    setFormValues({
      _id: formValues._id,
      moddingMapId: formValues.moddingMapId,
      authorOsuId: formValues.authorOsuId,
      osuTimestamp: formValues.osuTimestamp,
      content: moddingComment.content,
      resolved: formValues.resolved
    })
    setIsEditingComment(false)
  }

  function verifyData() {
    return handleEditSubmit(formValues)
  }

  function setFormValue(field, value) {
    let newFormValues = formValues
    newFormValues[field] = value
    setFormValues({
      ...newFormValues
    })
  }

  let authorDetails = getUserWithId(users, moddingComment.authorOsuId)
  let authorRole = getReadableRole(authorDetails.role)
  let submitIsActive = timestampRegex.test(formValues.content)

  let formattedText = formatOsuLinks(moddingComment.content)

  return (
    <div className={"beatmap-discussion-group"}>
      <div className={"beatmap-discussion-status"}>
        <Icon name={moddingComment.resolved ? "check" : "close"} color={moddingComment.resolved ? "green" : "red"} />
        {moddingComment.osuTimestamp}
      </div>
      <div className={moddingComment.resolved ? "beatmap-discussion-group-item beatmap-discussion-resolved" : "beatmap-discussion-group-item"}>
        <div className={"beatmap-discussion-item-top"}>
          <DiscussionAuthor authorDetails={authorDetails} authorRole={authorRole} />
          <div className={"beatmap-discussion-content-full"}>
            {isEditingComment === true &&
              <div className={"beatmap-discussion-main-edit"}>
                <textarea
                  className={"beatmap-discussion-response-textarea"}
                  value={formValues.content}
                  onChange={event => setFormValue("content", event.target.value)}
                />
                <Button disabled={!submitIsActive} color={submitIsActive ? "green" : "grey"} onClick={() => verifyData()}><Icon name={"check"}/>Submit</Button>
                <Button color={"red"} onClick={() => resetEdit()}><Icon name={"close"}/>Close</Button>
              </div>
            }
            {isEditingComment === false &&
              <>
                {formattedText}
                <div className={"beatmap-discussion-content-actions"}>
                  <div className={"link beatmap-discussion-content-action"} onClick={() => setIsEditingComment(true)}>Edit</div>
                  <div className={"link beatmap-discussion-content-action"} onClick={() => {
                    if (window.confirm('Are you sure you wish to delete this discussion?')) handleDeleteSubmit()
                  }}>Delete</div>
                </div>
              </>
            }

          </div>
        </div>
        {discussion.moddingResponses && discussion.moddingResponses.map((response, index) => {
          return <DiscussionItemResponse key={index} response={response} userId={userId} users={users} query={query} />
        })}
        <DiscussionItemResponseBox moddingComment={moddingComment} isWriting={isWritingReply} setIsWriting={setIsWritingReply} userId={userId} users={users} query={query} />
      </div>
    </div>
  )
}

export default DiscussionItem