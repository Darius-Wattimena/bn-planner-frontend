import React, {useState} from "react";
import UserList from "./UserList";
import "./Users.css"
import UserFilter from "./UserFilter";
import {Container} from "semantic-ui-react";
import AddUserModal from "./modals/AddUserModal";
import Api from "../../resources/Api";
import {useQuery} from "react-fetching-library";
import EditUserModal from "./modals/EditUserModal";

const filterDefaultState = {
  "osuId": null,
  "name": null,
  "roles": [],
  "limit": 10,
  "page": 1,
  "countTotal": true
};

const Users = ({canEdit, isAdmin}) => {
  const [filter, setFilter] = useState(filterDefaultState);
  const [selectedUser, setSelectedUser] = useState(0);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  let request = Api.fetchUsersByFilter(filter);
  const {loading, payload, error, query} = useQuery(request);

  return (
    <div className={"base-container-small"}>
      <Container fluid>
        <h1>Users</h1>
        <UserFilter filter={filter} setFilter={setFilter} setAddModalOpen={setAddModalOpen} isAdmin={isAdmin} />
        <UserList
          filter={filter}
          setFilter={setFilter}
          loading={loading}
          payload={payload}
          error={error}
          setEditModalOpen={setEditModalOpen}
          setSelectedUser={setSelectedUser}
          isAdmin={isAdmin}
        />
        <AddUserModal query={query} open={addModalOpen} setOpen={setAddModalOpen}/>
        {selectedUser !== 0 &&
          <EditUserModal
            id={selectedUser}
            open={editModalOpen}
            setOpen={setEditModalOpen}
            query={query}
            setSelectedUser={setSelectedUser}
            isAdmin={isAdmin}
          />
        }
      </Container>
    </div>
  )
};

export default Users