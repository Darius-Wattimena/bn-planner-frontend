import Api from "../../resources/Api";
import {useQuery} from "react-fetching-library";
import {Button, Card, Icon, Image, Label, Table} from "semantic-ui-react";
import React from "react";
import BasicPagination from "../generic/BasicPagination";
import {BEATMAP_STATUS, USER_ROLES} from "../../Constants";

const UserList = (props) => {
  let request = Api.fetchUsersByFilter(props.filter);
  const {loading, payload, error} = useQuery(request);

  let possibleLastPage = 0;

  if (!loading && !error) {
    possibleLastPage = Math.floor(payload.total / props.filter.limit)
  }

  function handleFilterSetPage(value) {
    let newFilter = props.filter;
    newFilter["page"] = value;
    props.setFilter({
      ...newFilter
    })
  }

  function getReadableRole(unreadableRole) {
    if (unreadableRole) {
      const keys = Object.keys(USER_ROLES);
      for (const key of keys) {
        let status = USER_ROLES[key];
        if (status.name === unreadableRole) {
          return status
        }
      }
    } else {
      return USER_ROLES["Observer"];
    }
  }

  return (
    <Table inverted selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Role</Table.HeaderCell>
          <Table.HeaderCell>Has Website Account</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {payload && payload.response && payload.response.map(user => {
          let userRole = getReadableRole(user.role);
          return (
            <Table.Row className={"user-row " + userRole.color}>
              <Table.Cell width={"2"}>
                <Image  className={"user-banner"} fluid src={user.profilePictureUri}/>
              </Table.Cell>
              <Table.Cell width={"2"}>{user.osuName}</Table.Cell>
              <Table.Cell width={"3"}><Label className={userRole.color}>{userRole.full}</Label></Table.Cell>
              <Table.Cell>
                <HasAccountIcon hasAccount={user.hasBoundAccount} />
              </Table.Cell>
              <Table.Cell width={"2"}>
                <Button.Group>
                  <Button inverted color={"green"}>
                    <Icon name={"eye"}/>
                  </Button>
                  <Button inverted color={"orange"}>
                    <Icon name={"pencil"}/>
                  </Button>
                  <Button inverted color={"blue"}
                          onClick={() => window.open("https://osu.ppy.sh/users/" + user.osuId, "_blank")}>
                    <Icon name={"linkify"}/>
                  </Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell width={"1"}>
            {payload &&
            <p>{payload.total} User Found</p>
            }
          </Table.HeaderCell>
          <Table.HeaderCell width={"8"} colSpan={"3"}>
            <BasicPagination currentPage={props.filter.page} lastPage={possibleLastPage} setPage={handleFilterSetPage}/>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
};

function HasAccountIcon(hasAccount) {
  if (hasAccount) {
    return (
      <Icon name={"check"} color={"green"} />
    )
  } else {
    return (
      <Icon name={"cancel"} color={"red"} />
    )
  }
}

export default UserList