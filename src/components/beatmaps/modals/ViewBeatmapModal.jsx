import React from "react";
import {useQuery} from "react-fetching-library";
import Api from "../../../resources/Api";
import {Button, Form, Header, Icon, Item, Message, Modal} from "semantic-ui-react";

const ViewBeatmapModal = (props) => {
  const {loading, payload, error} = useQuery(Api.getBeatmap(props.id));

  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
    >
      {!loading && !error &&
        <Header content={payload.artist + ' - ' + payload.title}/>
      }
      <Modal.Content>
        {!loading && !error &&
        <Form>
          <Form.Input
            label={"Beatmap Set ID"}
            placeholder={"Beatmap Set ID"}
            value={payload.osuId}
          />
          <Form.Input
            label={"Artist"}
            placeholder='Artist'
            value={payload.artist}
          />
          <Form.Input
            label={"Title"}
            placeholder='Title'
            value={payload.title}
          />
          <Form.Input
            label={"Mapper"}
            placeholder='Mapper'
            value={payload.mapper}
          />
          <Form.TextArea
            label={"Notes"}
            placeholder='Notes'
            value={payload.notes} />
        </Form>
        }
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={() => props.setOpen(false)} inverted>
          <Icon name='close' /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
};

export default ViewBeatmapModal