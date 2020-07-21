import {Button, Comment, Container, Feed, Form, Header} from "semantic-ui-react";
import React, {useState} from "react";
import { useParams } from 'react-router-dom';
import Api from "../../../resources/Api";
import {useMutation, useQuery} from "react-fetching-library";
import {useCookies} from "react-cookie";
import {getUserWithId} from "../../../util/UserUtil";
import ModdingForm from "./ModdingForm";

const ModdingDiscussion = ({canEdit, isAdmin, userId, users}) => {
  const {id} = useParams();
  const [cookies] = useCookies(['bnplanner_osu_access_token'])

  let request = Api.fetchModdingMapDiscussion(id, cookies.bnplanner_osu_access_token, userId)
  const {loading, payload, error, query} = useQuery(request)

  console.log({id, payload})
  return (
    <div className={"base-container"}>
      <Container fluid>
        <h1>Modding Maps - Discussion</h1>
        <ModdingForm mapId={id} userId={userId} query={query} cookies={cookies} />
        <Comment.Group>
          <Header as='h3' dividing>
            Comments
          </Header>
          {payload && payload.discussions.map((discussion, index) => {
            return (
              <MapDiscussion discussion={discussion} />
            )
          })}
        </Comment.Group>
      </Container>
    </div>
  )
}

const MapDiscussion = ({discussion}) => {
  return (
    <Comment>
      <Comment.Event
        image='/images/avatar/small/elliot.jpg'
        content='You added Elliot Fu to the group Coworkers'
      />
      <Comment.Group>
        {discussion.moddingResponses && discussion.moddingResponses.map((response, index) => {
          return <MapDiscussionResponse response={response} />
        })}
      </Comment.Group>
      <Comment.Actions>
        <Comment.Action>Reply</Comment.Action>
      </Comment.Actions>
    </Comment>
  )
}
const MapDiscussionResponse = ({response, users}) => {
  let authorDetails = getUserWithId(users, response.authorOsuId)

  return (
    <Comment>
      <Comment.Avatar src={authorDetails.profilePictureUri} />
      <Comment.Content>
        <Comment.Author as='a'>{authorDetails.osuName}</Comment.Author>
        <Comment.Text>{response.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

export default ModdingDiscussion