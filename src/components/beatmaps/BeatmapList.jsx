import React from 'react'
import { Grid } from 'semantic-ui-react'
import { BEATMAP_STATUS } from '../../Constants'
import BasicPagination from '../generic/BasicPagination'
import BeatmapListItem from './BeatmapListItem'

const BeatmapList = ({ users, loading, error, payload, filter, setEditModalOpen, setSelectedBeatmap, canEdit, setPage, redirectLocation }) => {
  let possibleLastPage = 0

  if (!loading && !error) {
    let limitValue
    if (filter.limit === 'Ten') {
      limitValue = 10
    } else if (filter.limit === 'Twenty') {
      limitValue = 20
    } else if (filter.limit === 'Fifty') {
      limitValue = 50
    } else {
      limitValue = 10
    }

    possibleLastPage = Math.ceil(payload.total / limitValue)
  }

  return (
    <Grid className={'multi-row-content'} textAlign={'center'} verticalAlign={'middle'}>
      <Grid.Row only={'computer'} className={'table-header-row'}>
        <Grid.Column computer={2}>#</Grid.Column>
        <Grid.Column computer={2}>Artist</Grid.Column>
        <Grid.Column computer={3}>Title</Grid.Column>
        <Grid.Column computer={2}>Mapper</Grid.Column>
        <Grid.Column computer={2}>Nominator #1</Grid.Column>
        <Grid.Column computer={2}>Nominator #2</Grid.Column>
        <Grid.Column computer={1}>Note</Grid.Column>
        <Grid.Column computer={2}>Actions</Grid.Column>
      </Grid.Row>
      {payload && payload.response && payload.response.map((beatmap, index) => {
        const displayStatus = getReadableStatus(beatmap.status)
        return <BeatmapListItem
          key={'beatmap-list-item-' + index}
          beatmap={beatmap}
          displayStatus={displayStatus}
          canEdit={canEdit}
          setEditModalOpen={setEditModalOpen}
          setSelectedBeatmap={setSelectedBeatmap}
          users={users}
          redirectLocation={redirectLocation}
        />
      })}
      <Grid.Row className={'table-footer-row'}>
        <Grid.Column width={2}>
          {payload &&
            <p>{payload.total} Beatmap(s) Found</p>
          }
        </Grid.Column>
        <Grid.Column width={12} />
        <Grid.Column width={2}>
          <BasicPagination currentPage={filter.page} lastPage={possibleLastPage} setPage={setPage}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

function getReadableStatus (unreadableStatus) {
  if (unreadableStatus) {
    const keys = Object.keys(BEATMAP_STATUS)
    for (const key of keys) {
      const status = BEATMAP_STATUS[key]
      if (status.id === unreadableStatus) {
        return status
      }
    }
  } else {
    return BEATMAP_STATUS.Pending
  }
}

export default BeatmapList
