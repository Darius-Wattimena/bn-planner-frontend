import {Button, Grid, Icon, Table} from "semantic-ui-react"
import React from "react"
import UserAvatar from "../../user/UserAvatar";
import {getUserWithId} from "../../../util/UserUtil";

const ContestList = ({payload, setAddModalOpen, setEditModalOpen, setSelectedContest, users}) => {
  console.log(payload)
  return (
    <Table inverted selectable>
      <Table.Header>
        <Table.Row key={"user-list-header"} textAlign={"center"}>
          <Table.HeaderCell width={"2"} />
          <Table.HeaderCell width={"4"}>Contest</Table.HeaderCell>
          <Table.HeaderCell width={"8"}>Has Access</Table.HeaderCell>
          <Table.HeaderCell width={"2"} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {payload && payload.map((contest, index) => {
          return (
            <Table.Row key={"user-list-" + index} className={"user-row"}>
              <Table.Cell width={"2"} textAlign={"center"}># {index + 1}</Table.Cell>
              <Table.Cell width={"4"} textAlign={"center"}>{contest.name}</Table.Cell>
              <Table.Cell width={"8"} textAlign={"center"}><Grid textAlign={"left"}>{contest.accessIds.map((userId) => {
                let userDetails = getUserWithId(users, userId)
                return (
                  <Grid.Column width={4}>
                    <UserAvatar userDetails={userDetails} />
                  </Grid.Column>
                )
              })}</Grid></Table.Cell>
              <Table.Cell width={"2"} textAlign={"center"}>
                <Button.Group fluid>
                  <Button color={"green"} onClick={_ => {
                    setSelectedContest(contest._id)
                    setEditModalOpen(true)
                  }}>
                    <Icon fitted name={"pencil"}/>
                  </Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
      <Table.Footer>
        <Table.Row key={"user-list-footer"}>
          <Table.HeaderCell width={"2"} textAlign={"center"}>
            {payload &&
              <p>{payload.length} Contests Found</p>
            }
          </Table.HeaderCell>
          <Table.HeaderCell width={"4"} />
          <Table.HeaderCell width={"8"} />
          <Table.HeaderCell width={"2"}>
            <Button fluid color={"green"} onClick={() => setAddModalOpen(true)}><Icon name={"plus"} /> Add Contest</Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default ContestList