import React, { useState } from 'react'
import Api from '../../../resources/Api'
import { useQuery } from 'react-fetching-library'
import { Container } from 'semantic-ui-react'
import ModdingMapList from './ModdingMapList'
import { useCookies } from 'react-cookie'
import AddModdingMapModal from './modals/AddModdingMapModal'

const ModdingMap = ({ canEdit, isAdmin, userId, users }) => {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [cookies] = useCookies(['bnplanner_osu_access_token'])

  const request = Api.fetchModdingMaps(cookies.bnplanner_osu_access_token, userId)
  const { payload, query } = useQuery(request)

  return (
    <div className={'base-container'}>
      <Container fluid>
        <div className={'section'}>
          <div className={'section-title'}>Modding Maps</div>
        </div>
        <ModdingMapList isAdmin={isAdmin} payload={payload} setAddModalOpen={setAddModalOpen} users={users}/>
        <AddModdingMapModal query={query} open={addModalOpen} setOpen={setAddModalOpen} userId={userId} users={users}/>
      </Container>
    </div>
  )
}

export default ModdingMap
