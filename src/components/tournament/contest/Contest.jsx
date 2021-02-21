import React, { useState } from 'react'
import Api from '../../../resources/Api'
import { useQuery } from 'react-fetching-library'
import { Container } from 'semantic-ui-react'
import ContestList from './ContestList'
import { useCookies } from 'react-cookie'
import AddContestModal from './modals/AddContestModal'

const Contest = ({ canEdit, isAdmin, userId, users }) => {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [cookies] = useCookies(['bnplanner_osu_access_token'])

  const request = Api.fetchContests(cookies.bnplanner_osu_access_token, userId)
  const { payload, query } = useQuery(request)

  return (
    <div className={'base-container'}>
      <Container fluid>
        <div className={'section'}>
          <div className={'section-title'}>Contests</div>
        </div>
        <ContestList isAdmin={isAdmin} payload={payload} setAddModalOpen={setAddModalOpen} users={users}/>
        <AddContestModal query={query} open={addModalOpen} setOpen={setAddModalOpen} userId={userId} users={users}/>
      </Container>
    </div>
  )
}

export default Contest
