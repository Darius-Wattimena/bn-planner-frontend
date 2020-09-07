import React, {useState} from "react"
import UserList from "./UserList"
import "./Users.scss"
import UserFilter from "./UserFilter"
import {Container} from "semantic-ui-react"
import AddUserModal from "./modals/AddUserModal"
import Api from "../../resources/Api"
import {useQuery} from "react-fetching-library"
import EditUserModal from "./modals/EditUserModal"

const filterDefaultState = {
  "name": null,
  "roles": [],
  "limit": "Ten",
  "page": 1,
  "countTotal": true,
  "canEdit": null,
  "isAdmin": null
}

const Users = ({canEdit, isAdmin, userId, users}) => {
  const [filter, setFilter] = useState(filterDefaultState)
  const [selectedUser, setSelectedUser] = useState(0)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  let request = Api.fetchUsersByFilter(filter)
  const {loading, payload, error, query} = useQuery(request)

  function handleFilterSetPage(value) {
    let newFilter = filter
    newFilter["page"] = value
    setFilter({
      ...newFilter
    })
  }

  return (
    <div className={"base-container"}>
      <Container fluid>
        <div className={"section"}>
          <div className={"section-title"}>Users</div>
        </div>
        <UserFilter filter={filter} setFilter={setFilter} setAddModalOpen={setAddModalOpen} isAdmin={isAdmin}
                    canEdit={canEdit} setPage={handleFilterSetPage}/>
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
        <AddUserModal query={query} open={addModalOpen} setOpen={setAddModalOpen} userId={userId}/>
        {selectedUser !== 0 &&
        <EditUserModal
          id={selectedUser}
          open={editModalOpen}
          setOpen={setEditModalOpen}
          query={query}
          setSelectedUser={setSelectedUser}
          isAdmin={isAdmin}
          userId={userId}
          users={users}
        />
        }
      </Container>
    </div>
  )
}

export default Users