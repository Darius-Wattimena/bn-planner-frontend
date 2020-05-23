import React, {useState} from "react";
import UserList from "./UserList";
import "./Users.css"
import UserFilter from "./UserFilter";
import {Container} from "semantic-ui-react";
import AddUserModal from "./modals/AddUserModal";
import Api from "../../resources/Api";
import {useQuery} from "react-fetching-library";
import EditUserModal from "./modals/EditUserModal";
import AddBeatmapModal from "../beatmaps/modals/AddBeatmapModal";

const filterDefaultState = {
  "osuId": null,
  "name": null,
  "roles": [],
  "limit": 10,
  "page": 1,
  "countTotal": true
};

const Users = ({canEdit, isAdmin, userId}) => {
  const [filter, setFilter] = useState(filterDefaultState);
  const [selectedUser, setSelectedUser] = useState(0);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  let request = Api.fetchUsersByFilter(filter);
  const {loading, payload, error, query} = useQuery(request);

  function handleFilterSetPage(value) {
    let newFilter = filter;
    newFilter["page"] = value;
    setFilter({
      ...newFilter
    })
  }

  return (
    <div className={"base-container-small"}>
      <Container fluid>
        <h1>Users</h1>
        <UserFilter filter={filter} setFilter={setFilter} setAddModalOpen={setAddModalOpen} isAdmin={isAdmin} setPage={handleFilterSetPage} />
        <UserList
          filter={filter}
          loading={loading}
          payload={payload}
          error={error}
          setEditModalOpen={setEditModalOpen}
          setSelectedUser={setSelectedUser}
          isAdmin={isAdmin}
          setPage={handleFilterSetPage}
        />
        <AddUserModal query={query} open={addModalOpen} setOpen={setAddModalOpen} userId={userId} />
        {selectedUser !== 0 &&
          <EditUserModal
            id={selectedUser}
            open={editModalOpen}
            setOpen={setEditModalOpen}
            query={query}
            setSelectedUser={setSelectedUser}
            isAdmin={isAdmin}
            userId={userId}
          />
        }
      </Container>
    </div>
  )
};

export default Users