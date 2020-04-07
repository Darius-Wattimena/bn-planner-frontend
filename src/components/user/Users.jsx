import React, {useState} from "react";
import UserList from "./UserList";
import "./Users.css"
import UserFilter from "./UserFilter";
import {Container} from "semantic-ui-react";

const filterDefaultState = {
  "osuId": null,
  "name": null,
  "roles": [],
  "limit": 10,
  "page": 1,
  "countTotal": true
};

const Users = () => {
  const [filter, setFilter] = useState(filterDefaultState);

  return (
    <div className={"base-container-small"}>
      <Container fluid>
        <h1>Users</h1>
        <UserFilter filter={filter} setFilter={setFilter} />
        <UserList filter={filter} setFilter={setFilter} />
      </Container>
    </div>
  )
};

export default Users