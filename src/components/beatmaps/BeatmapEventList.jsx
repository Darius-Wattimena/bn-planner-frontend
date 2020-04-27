import React from "react";
import {Image, List} from "semantic-ui-react";
import {unix} from "dayjs";

const BeatmapEventList = ({events}) => {

  if (events && events.length !== 0) {
    return (
      <List divided relaxed inverted celled className={"scrollable-list"}>
        {events.sort(function(a, b){
          return b.timestamp-a.timestamp
        }).map((event, index) => {
          return (
            <List.Item key={"event-item-" + index}>
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