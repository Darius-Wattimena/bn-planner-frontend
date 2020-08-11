import React, {useState} from "react"
import Api from "../../../resources/Api"
import {useQuery} from "react-fetching-library"
import {Container} from "semantic-ui-react"
import ContestList from "./ContestList"
import {useCookies} from "react-cookie"
import AddContestModal from "./modals/AddContestModal"

const Contest = ({canEdit, isAdmin, userId, users}) => {
  const [selectedContest, setSelectedContest] = useState(0)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [cookies] = useCookies(['bnplanner_osu_access_token'])

  let request = Api.fetchContests(cookies.bnplanner_osu_access_token, userId)
  const {loading, payload, error, query} = useQuery(request)

  return (
    <div className={"base-container"}>
      <Container fluid>
        <h2>Contests</h2>
        <ContestList isAdmin={isAdmin} payload={payload} setAddModalOpen={setAddModalOpen}
                     setEditModalOpen={setEditModalOpen} setSelectedContest={setSelectedContest} users={users}/>
        <AddContestModal query={query} open={addModalOpen} setOpen={setAddModalOpen} userId={userId} users={users}/>
      </Container>
    </div>
  )
}

export default Contest