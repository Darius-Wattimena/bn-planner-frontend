import React, {useState} from "react";
import Api from "../../../resources/Api";
import {useQuery} from "react-fetching-library";
import {Container} from "semantic-ui-react";
import ModdingMapList from "./ModdingMapList";
import {useCookies} from "react-cookie";
import AddModdingMapModal from "./modals/AddModdingMapModal";

const ModdingMap = ({canEdit, isAdmin, userId, users}) => {
  const [selectedModdingMap, setSelectedModdingMap] = useState(0)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [cookies] = useCookies(['bnplanner_osu_access_token'])

  let request = Api.fetchModdingMaps(cookies.bnplanner_osu_access_token, userId)
  const {loading, payload, error, query} = useQuery(request)

  return (
    <div className={"base-container"}>
      <Container fluid>
        <h2>Modding Maps</h2>
        <ModdingMapList isAdmin={isAdmin} payload={payload} setAddModalOpen={setAddModalOpen}
                        setEditModalOpen={setEditModalOpen} setSelectedModdingMap={setSelectedModdingMap}
                        users={users}/>
        <AddModdingMapModal query={query} open={addModalOpen} setOpen={setAddModalOpen} userId={userId} users={users}/>
      </Container>
    </div>
  )
}

export default ModdingMap