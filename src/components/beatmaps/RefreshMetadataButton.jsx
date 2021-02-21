import { Button, Icon } from 'semantic-ui-react'
import React, { useState } from 'react'
import RefreshBeatmapModal from './modals/RefreshBeatmapModal'

const RefreshMetadataButton = ({ canEdit, beatmap, userId, onModalReset }) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  return (
    <>
      <Button
        fluid
        disabled={!canEdit}
        color={'green'}
        onClick={() => { setConfirmModalOpen(true) }}>
        <Icon name={'refresh'} /> Sync
      </Button>
      <RefreshBeatmapModal
        open={confirmModalOpen}
        setOpen={setConfirmModalOpen}
        userId={userId}
        beatmap={beatmap}
        onModalReset={onModalReset}
      />
    </>
  )
}

export default RefreshMetadataButton
