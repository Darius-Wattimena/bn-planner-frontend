import {useCookies} from "react-cookie"
import React, {useState} from "react"
import {useMutation} from "react-fetching-library"
import {getReadableRole, getUserWithId} from "../../../util/UserUtil"
import {Button, Icon} from "semantic-ui-react"
import DiscussionAuthor from "./DiscussionAuthor"

const DiscussionItemResponseTextArea = ({users, userId, moddingCommentId, setIsWriting, request, query}) => {
  const [cookies] = useCookies(['bnplanner_osu_access_token'])
  const [formValues, setFormValues] = useState({
    _id: "",
    moddingCommentId: moddingCommentId,
    authorOsuId: userId,
    content: ""
  })

  const {mutate} = useMutation(request)

  const handleSubmit = async (formValues) => {
    const {error: mutateError} = await mutate(formValues, cookies.bnplanner_osu_access_token, userId)

    if (mutateError) {
      console.log(mutateError)
    } else {
      setFormValues({
        _id: "",
        moddingCommentId: moddingCommentId,
        authorOsuId: userId,
        content: ""
      })
      query()
      setIsWriting(false)
    }
  }

  function verifyData() {
    if (/\S/.test(formValues.content)) {
      return handleSubmit(formValues)
    }
  }

  function setFormValue(field, value) {
    let newFormValues = formValues
    newFormValues[field] = value
    setFormValues({
      ...newFormValues
    })
  }

  let authorDetails = getUserWithId(users, userId)
  let authorRole = getReadableRole(authorDetails.role)
  let submitIsActive = /\S/.test(formValues.content)

  return (
    <>
      <div className={"beatmap-discussion-item beatmap-discussion-item-reply"}>
        <DiscussionAuthor authorDetails={authorDetails} authorRole={authorRole}/>
        <div className={"beatmap-discussion-content-full"}>
          <textarea
            className={"beatmap-discussion-response-textarea"}
            value={formValues.content}
            onChange={event => setFormValue("content", event.target.value)}
          />
        </div>
      </div>
      <Button disabled={!submitIsActive} color={submitIsActive ? "green" : "grey"} onClick={() => verifyData()}><Icon
        name={"check"}/>Submit</Button>
      <Button color={"red"} onClick={() => setIsWriting(false)}><Icon name={"close"}/>Close</Button>
    </>
  )
}

export default DiscussionItemResponseTextArea