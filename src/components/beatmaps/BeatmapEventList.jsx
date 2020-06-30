import React from "react";
import {Image, List} from "semantic-ui-react";
import {unix} from "dayjs";
import {getReadableRole, getUserWithId} from "../../util/UserUtil";
import "./BeatmapEventList.css"

const BeatmapEventList = ({events, users}) => {
  if (events && events.length !== 0) {
    return (
      <List divided relaxed inverted celled className={"scrollable-list event-list"}>
        {events.sort(function(a, b){
          return b.timestamp-a.timestamp
        }).map((event, index) => {
          let eventUser = getUserWithId(users, event.user.osuId)
          let roleDetails = getReadableRole(eventUser.role);
          return (
            <List.Item key={"event-item-" + index} className={"event-item " + roleDetails.className}>
              <Image avatar src={event.user.profilePictureUri}/>
              <List.Content>
                <List.Header>{event.title}</List.Header>
                <List.Description>{event.description}</List.Description>
                {unix(event.timestamp).format("DD MMMM YYYY HH:mm")}
              </List.Content>
            </List.Item>

          )
        })}
      </List>
    )
  } else {
    return (
      <div>
        No Events
      </div>
    )
  }
};

export default BeatmapEventList