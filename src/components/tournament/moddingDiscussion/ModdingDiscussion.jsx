import {Container} from "semantic-ui-react";
import React from "react";
import {useParams} from 'react-router-dom';
import Api from "../../../resources/Api";
import {useQuery} from "react-fetching-library";
import {useCookies} from "react-cookie";
import "./ModdingDiscussion.scss"
import DiscussionItem from "./DiscussionItem";
import DiscussionItemForm from "./DiscussionItemForm";

const ModdingDiscussion = ({canEdit, isAdmin, userId, users}) => {
  const {id} = useParams();
  const [cookies] = useCookies(['bnplanner_osu_access_token'])

  let request = Api.fetchModdingMapDiscussion(id, cookies.bnplanner_osu_access_token, userId)
  const {loading, payload, error, query} = useQuery(request)

  return (
    <div className={"base-container base-container-small"}>
      <Container fluid>
        <h2 className={"text header-title"}>Modding Maps</h2>
        {payload &&
        <>
          <div className={"beatmap-discussion-section"}>
            <div className={"beatmap-discussion-title"}>Info</div>
            <div className={"beatmap-discussion-container"}>
              <div className={"beatmap-info"}>
                <div className={"beatmap-info-item"}>
                  <div className={"label"}>Contest</div>
                  <div className={"text"}>{payload.map.contestId}</div>
                </div>
                <div className={"beatmap-info-item"}>
                  <div className={"label"}>Artist</div>
                  <div className={"text"}>{payload.map.artist}</div>
                </div>
                <div className={"beatmap-info-item"}>
                  <div className={"label"}>Title</div>
                  <div className={"text"}>{payload.map.title}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={"beatmap-discussion-section"}>
            <div className={"beatmap-discussion-title"}>Add Discussion</div>
            <div className={"beatmap-discussion-container"}>
              <DiscussionItemForm users={users} userId={userId} query={query} moddingMapId={payload.map._id}/>
            </div>
          </div>
          <div className={"beatmap-discussion-section"}>
            <div className={"beatmap-discussion-title"}>Discussions</div>
            <div className={"beatmap-discussion-container"}>
              {payload.discussions.map((discussion, index) => {
                return (
                  <DiscussionItem key={index} discussion={discussion} users={users} userId={userId} query={query}/>
                )
              })}
            </div>
          </div>
        </>
        }
      </Container>
    </div>
  )
}

export default ModdingDiscussion