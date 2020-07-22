import {useCookies} from "react-cookie";
import React, {useState} from "react";
import {useMutation} from "react-fetching-library";
import {getReadableRole, getUserWithId} from "../../../util/UserUtil";
import DiscussionAuthor from "./DiscussionAuthor";
import {Button, Icon} from "semantic-ui-react";
import Api from "../../../resources/Api";
import {timestampRegex} from "../../../util/DiscussionUtil";

const DiscussionItemForm = ({moddingMapId, users, userId, query}) => {
  const [cookies] = useCookies(['bnplanner_osu_access_token'])
  const [formValues, setFormValues] = useState({
    _id: "",
    moddingMapId: moddingMapId,
    authorOsuId: userId,
    osuTimestamp: "",
    content: "",
    resolved: false
  })

  const {mutate} = useMutation(Api.addModdingComment)

  const handleSubmit = async (formValues) => {
    const {error: mutateError} = await mutate(formValues, cookies.bnplanner_osu_access_token, userId)

    if (mutateError) {
      console.log(mutateError)
    } else {
      setFormValues({
        _id: "",
        moddingMapId: moddingMapId,
        authorOsuId: userId,
        osuTimestamp: "",
        content: "",
        resolved: false
      })
      query()
    }
  }

  function verifyData() {
    if (timestampRegex.test(formValues.content)) {
      let firstMatch = timestampRegex.exec(formValues.content)[0]
      setFormValue("osuTimestamp", firstMatch)
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
  let submitIsActive = timestampRegex.test(formValues.content)

  return (
    <div className={"beatmap-discussion-main-actions"}>
      <div className={"beatmap-discussion-item beatmap-discussion-item-reply"}>
        <DiscussionAuthor authorDetails={authorDetails} authorRole={authorRole} />
        <div className={"beatmap-discussion-content-full"}>
          <textarea
            className={"beatmap-discussion-response-textarea"}
            value={formValues.content}
            onChange={event => setFormValue("content", event.target.value)}
          />
        </div>
      </div>
      <Button disabled={!submitIsActive} color={submitIsActive ? "green" : "grey"} onClick={() => verifyData()}><Icon name={"check"}/>Submit</Button>
    </div>
  )
}

export default DiscussionItemForm