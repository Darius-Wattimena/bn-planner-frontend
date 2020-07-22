import {Button, Container, Icon, Image, Label} from "semantic-ui-react";
import React, {useState} from "react";
import { useParams } from 'react-router-dom';
import Api from "../../../resources/Api";
import {useMutation, useQuery} from "react-fetching-library";
import {useCookies} from "react-cookie";
import {getReadableRole, getUserWithId} from "../../../util/UserUtil";
import "./ModdingDiscussion.css"
import {formatOsuLinks} from "../../../util/DiscussionUtil";

const ModdingDiscussion = ({canEdit, isAdmin, userId, users}) => {
  const {id} = useParams();
  const [cookies] = useCookies(['bnplanner_osu_access_token'])

  let request = Api.fetchModdingMapDiscussion(id, cookies.bnplanner_osu_access_token, userId)
  const {loading, payload, error, query} = useQuery(request)

  return (
    <div className={"base-container base-container-small"}>
      <Container fluid>
        <h2 className={"text header-title"}>Modding Maps</h2>
        <div className={"beatmap-discussion-title"}>Discussions</div>
        <div className={"beatmap-discussion-container"}>
          {payload && payload.discussions.map((discussion, index) => {
            return (
              <DiscussionItem key={index} discussion={discussion} users={users} userId={userId} query={query} />
            )
          })}
        </div>
      </Container>
    </div>
  )
}

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
      <div className={"beatmap-discussion-item-group"}>
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
    return handleSubmit(formValues)
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

  return (
    <>
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
      <Button color={"green"} onClick={() => verifyData()}><Icon name={"check"}/>Submit</Button>
      <Button color={"red"} onClick={() => setIsWriting(false)}><Icon name={"close"}/>Close</Button>
    </>
  )
}

const DiscussionItemResponseBox = ({moddingComment, isWriting, setIsWriting, userId, users, query}) => {
  if (isWriting && isWriting === true) {
    return (
      <div className={"beatmap-discussion-main-actions"}>
        <DiscussionItemResponseTextArea
          users={users}
          userId={userId}
          moddingCommentId={moddingComment._id}
          setIsWriting={setIsWriting}
          query={query}
          request={Api.addModdingResponse}
        />
      </div>
    )
  } else {
    return (
      <div className={"beatmap-discussion-main-actions"}>
        {moddingComment.resolved === true &&
        <Button color={"red"}><Icon name={"close"}/>Unresolve</Button>
        }
        {moddingComment.resolved === false &&
        <Button color={"blue"}><Icon name={"check"}/>Resolve</Button>
        }
        <Button color={"green"} onClick={() => setIsWriting(true)}><Icon name={"reply"}/>Respond</Button>
      </div>
    )
  }
}

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

export default ModdingDiscussion