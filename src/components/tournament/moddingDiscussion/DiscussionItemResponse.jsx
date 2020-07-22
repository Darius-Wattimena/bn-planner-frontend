import {getReadableRole, getUserWithId} from "../../../util/UserUtil";
import {formatOsuLinks, timestampRegex} from "../../../util/DiscussionUtil";
import React, {useState} from "react";
import DiscussionAuthor from "./DiscussionAuthor";
import {useMutation} from "react-fetching-library";
import Api from "../../../resources/Api";
import {useCookies} from "react-cookie";
import {Button, Icon} from "semantic-ui-react";

const DiscussionItemResponse = ({response, users, userId, query}) => {
  const [cookies] = useCookies(['bnplanner_osu_access_token'])
  const [isEditingComment, setIsEditingComment] = useState(false)
  const [formValues, setFormValues] = useState(response)
  const {mutate: editMutate} = useMutation(Api.editModdingResponse)
  const {mutate: deleteMutate} = useMutation(Api.deleteModdingResponse)

  function resetEdit() {
    setFormValues({
      _id: formValues._id,
      moddingCommentId: formValues.moddingCommentId,
      authorOsuId: formValues.authorOsuId,
      content: response.content
    })
    setIsEditingComment(false)
  }

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
    const {error: mutateError} = await deleteMutate(response._id, cookies.bnplanner_osu_access_token, userId)

    if (mutateError) {
      console.log(mutateError)
    } else {
      query()
    }
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

  let authorDetails = getUserWithId(users, response.authorOsuId)
  let authorRole = getReadableRole(authorDetails.role)
  let submitIsActive = /\S/.test(formValues.content)

  let formattedText = formatOsuLinks(response.content)

  return (
    <div className={"beatmap-discussion-item"}>
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
              <a className={"beatmap-discussion-content-action"} onClick={() => setIsEditingComment(true)}>Edit</a>
              <a className={"beatmap-discussion-content-action"} onClick={() => {
                if (window.confirm('Are you sure you wish to delete this discussion?')) handleDeleteSubmit()
              }}>Delete</a>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default DiscussionItemResponse