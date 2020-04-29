import {Button, Icon, Image, Label, Table} from "semantic-ui-react";
import React from "react";
import BasicPagination from "../generic/BasicPagination";
import {getReadableRole} from "../../util/UserUtil";

const UserList = ({loading, error, filter, setFilter, payload, setEditModalOpen, setSelectedUser, isAdmin}) => {

  let possibleLastPage = 0;

  if (!loading && !error) {
    possibleLastPage = Math.ceil(payload.total / filter.limit)
  }

  function handleFilterSetPage(value) {
    let newFilter = filter;
    newFilter["page"] = value;
    setFilter({
      ...newFilter
    })
  }

  return (
    <Table inverted selectable>
      <Table.Header>
        <Table.Row key={"user-list-header"} textAlign={"center"}>
          <Table.HeaderCell />
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Role</Table.HeaderCell>
          <Table.HeaderCell>Has Account</Table.HeaderCell>
          <Table.HeaderCell>Can Edit</Table.HeaderCell>
          <Table.HeaderCell>Is Admin</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {payload && payload.response && payload.response.map((user, index) => {
          let userRole = getReadableRole(user.role);
          return (
            <Table.Row key={"user-list-" + index} className={"user-row " + userRole.className} textAlign={"center"}>
              <Table.Cell width={"2"}>
                <Image  className={"user-banner"} fluid src={user.profilePictureUri}/>
              </Table.Cell>
              <Table.Cell width={"2"}>{user.osuName}</Table.Cell>
              <Table.Cell width={"3"}><Label className={userRole.className}>{userRole.full}</Label></Table.Cell>
              <Table.Cell width={"2"}>
                <AccessIcon hasAccess={user.hasBoundAccount} />
              </Table.Cell>
              <Table.Cell width={"2"}>
                <AccessIcon hasAccess={user.hasEditPermissions} />
              </Table.Cell>
              <Table.Cell width={"2"}>
                <AccessIcon hasAccess={user.hasAdminPermissions} />
              </Table.Cell>
              <Table.Cell width={"2"}>
                <Button.Group>
                  <Button inverted color={"green"} onClick={_ => {
                    setSelectedUser(user.osuId);
                    setEditModalOpen(true)
                  }}>
                    <Icon name={isAdmin ? "pencil" : "eye"}/>
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
        <Table.Row key={"user-list-footer"}>
          <Table.HeaderCell width={"2"} textAlign={"center"}>
            {payload &&
            <p>{payload.total} User Found</p>
            }
          </Table.HeaderCell>
          <Table.HeaderCell width={"14"} colSpan={"6"}>
            <BasicPagination currentPage={filter.page} lastPage={possibleLastPage} setPage={handleFilterSetPage}/>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
};

function AccessIcon({hasAccess}) {
  if (hasAccess && hasAccess === true) {
    return (
      <div>
        <Icon size={"large"} name={"check"} color={"green"} />
      </div>
    )
  } else {
    return (
      <div>
        <Icon size={"large"}  name={"cancel"} color={"red"} />
      </div>
    )
  }
}

export default UserList