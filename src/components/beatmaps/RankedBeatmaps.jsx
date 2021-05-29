import React, { useState } from 'react'
import Api from '../../resources/Api'
import { useQuery } from 'react-fetching-library'
import { Container } from 'semantic-ui-react'
import BeatmapList from './BeatmapList'
import { BEATMAP_STATUS } from '../../Constants'
import BeatmapFilter from './BeatmapFilter'
import { useParams, useLocation } from 'react-router-dom'
import EditBeatmapV2Modal from './modals/EditBeatmapV2Modal'

const filterDefaultState = {
  artist: null,
  title: null,
  mapper: null,
  status: [BEATMAP_STATUS.Ranked.id],
  limit: 'Ten',
  page: 1,
  countTotal: true,
  hideRanked: false,
  hideGraved: true,
  hideWithTwoNominators: false,
  nominator: null
}

const RankedBeatmaps = ({ canEdit, isAdmin, userId, users }) => {
  const [filter, setFilter] = useState(filterDefaultState)
  const [selectedBeatmap, setSelectedBeatmap] = useState(0)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const { beatmapId } = useParams()
  const location = useLocation()
  let selectedNominator

  if (location.state) {
    selectedNominator = location.state.nominator
  }

  // Check if a beatmap id is provided so we can already open the modal with the provided map
  if (beatmapId && !isNaN(beatmapId) && selectedBeatmap === 0) {
    setSelectedBeatmap(beatmapId)
    setEditModalOpen(true)
  }

  const request = Api.fetchBeatmapsByFilter(filter)
  const { loading, payload, error, query } = useQuery(request)

  function handleFilterSetPage (value) {
    const newFilter = filter
    newFilter.page = value
    setFilter({
      ...newFilter
    })
  }

  return (
    <div className={'base-container base-container-large'}>
      <Container fluid>
        <div className={'section'}>
          <div className={'section-title'}>Ranked Beatmaps</div>
          <div className={'section-container'}>
            <BeatmapFilter
              users={users}
              filter={filter}
              setFilter={setFilter}
              canEdit={canEdit}
              setPage={handleFilterSetPage}
              onRankedPage={true}
              userId={userId}
              initialNominator={selectedNominator}
            />
          </div>
        </div>

        <div className={'table-section'}>
          <div className={'table-list-container'}>
            <BeatmapList
              users={users}
              loading={loading}
              payload={payload}
              error={error}
              filter={filter}
              setEditModalOpen={setEditModalOpen}
              setSelectedBeatmap={setSelectedBeatmap}
              canEdit={isAdmin}
              setPage={handleFilterSetPage}
              redirectLocation={'ranked'}
            />
          </div>
        </div>

        {selectedBeatmap !== 0 &&
        <EditBeatmapV2Modal
          id={selectedBeatmap}
          userId={userId}
          canEdit={isAdmin}
          isAdmin={isAdmin}
          query={query}
          open={editModalOpen}
          setOpen={setEditModalOpen}
          users={users}
          setSelectedBeatmap={setSelectedBeatmap}
          redirectLocation={'ranked'}
        />
        }
      </Container>
    </div>
  )
}

export default RankedBeatmaps
