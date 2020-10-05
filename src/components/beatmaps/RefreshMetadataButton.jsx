import {Button, Icon} from "semantic-ui-react";
import React, {useState} from "react";
import {useQuery} from "react-fetching-library";
import Api from "../../resources/Api";
import {useCookies} from "react-cookie";

const RefreshMetadataButton = ({canEdit, beatmap, userId, onModalReset}) => {
  const [cookies] = useCookies(['bnplanner_osu_access_token'])
  const [showError, setShowError] = useState(false)
  const {query, loading} = useQuery(Api.refreshMetadata(beatmap.osuId, cookies.bnplanner_osu_access_token, userId), false)

  function refreshMetadata() {
    return asyncRefreshMetadata()
  }

  const asyncRefreshMetadata = async () => {
    const {payload, error} = await query()

    if (payload === false || error) {
      setShowError(true)
    } else if (payload === true) {
      onModalReset()
    }
  }

  return (
    <Button
      disabled={!canEdit || loading}
      color={showError ? "red" : "green"}
      onClick={refreshMetadata}>
      <Icon name={"refresh"} rotated={loading ? "clockwise" : null} /> Sync with osu!
    </Button>
  )
}

export default RefreshMetadataButton