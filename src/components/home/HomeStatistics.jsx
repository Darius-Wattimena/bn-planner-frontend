import React from "react"
import Api from "../../resources/Api"
import {useQuery} from "react-fetching-library"
import {Grid, Icon, Image, Popup} from "semantic-ui-react"
import {getReadableRole, getUserWithId} from "../../util/UserUtil"

const HomeStatistics = ({users}) => {
  let request = Api.fetchLatestStatistics()
  const {loading, payload, error, query} = useQuery(request)

  if (payload) {
    const sortedUserPendingIcons = []
    for (const userPendingIcon in payload.userPendingIcons) {
      sortedUserPendingIcons.push([parseInt(userPendingIcon), payload.userPendingIcons[userPendingIcon]])
    }
    sortedUserPendingIcons.sort(function (a, b) {
      return b[1] - a[1]
    })


    const sortedUserNominatedIcons = []
    for (const userNominatedIcon in payload.userNominatedIcons) {
      sortedUserNominatedIcons.push([parseInt(userNominatedIcon), payload.userNominatedIcons[userNominatedIcon]])
    }
    sortedUserNominatedIcons.sort(function (a, b) {
      return b[1] - a[1]
    })

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Leaderboard sortedValues={sortedUserPendingIcons} users={users} title={"Total Icons"}/>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Leaderboard sortedValues={sortedUserNominatedIcons} users={users} title={"Total Nominated Icons"}/>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <div className={"text leaderboard"}>
                <div className={"leaderboard-name"}>General</div>
                <Grid>
                  <Grid.Row>
                    <Grid.Column mobile={16} tablet={16} computer={8}>
                      <div className={"leaderboard-items"}>
                        <div className={"leaderboard-items-group"}>
                          <div className={"leaderboard-items-group-header"}>
                            <Icon name={"folder"}/>
                            Beatmaps
                          </div>
                          <StatisticsItem title={"Total"} amount={payload.totalBeatmaps}/>
                          <StatisticsItem title={"Pending"} amount={payload.totalInProgress}/>
                          <StatisticsItem title={"Missing BN"} amount={payload.totalMissingSecondBN}/>
                        </div>

                        <div className={"leaderboard-items-group"}>
                          <div className={"leaderboard-items-group-header"}>
                            <Icon name={"exclamation circle"}/>
                            Beatmap Status
                          </div>
                          <StatisticsItem title={"Pending"} amount={payload.activePending}/>
                          <StatisticsItem title={"Qualified"} amount={payload.activeNominated}/>
                          <StatisticsItem title={"Bubbled"} amount={payload.activeBubbled}/>
                          <StatisticsItem title={"Disqualified"} amount={payload.activeDisqualified}/>
                          <StatisticsItem title={"Popped"} amount={payload.activePopped}/>
                        </div>
                      </div>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={8}>
                      <div className={"leaderboard-items"}>
                        <div className={"leaderboard-items-group"}>
                          <div className={"leaderboard-items-group-header"}>
                            <Icon name={"users"}/>
                            Users
                          </div>
                          <StatisticsItem title={"Total"} amount={payload.totalUser}/>
                          <StatisticsItem title={"Nominators"} amount={payload.totalNominators}/>
                          <StatisticsItem title={"Full"} amount={payload.totalFullNominators}/>
                          <StatisticsItem title={"Probation"} amount={payload.totalProbation}/>
                          <StatisticsItem title={"NAT's"} amount={payload.totalNATs}/>
                          <StatisticsItem
                            title={"Other"} amount={payload.totalOtherNominators}
                            popupText={"Other gamemode nominators"}/>
                          <StatisticsItem title={"Guests"} amount={payload.totalGuests}/>
                        </div>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  } else {
    return (
      <div className={"text"}>No Data</div>
    )
  }
}

const StatisticsItem = ({title, amount, popupText}) => {
  return (
    <div className={"leaderboard-item"}>
      <div className={"leaderboard-item-label"}>
        <div className={"leaderboard-item-label-text"}>
          {title}
          {popupText &&
          <Popup trigger={<Icon className={"leaderboard-item-label-popup-icon"} name={"question circle"}/>}
                 content={<div className={"popup-text leaderboard-item-label-popup"}>{popupText}</div>}/>
          }
        </div>
      </div>
      <div className={"leaderboard-item-amount"}>{amount}</div>
    </div>
  )
}

const Leaderboard = ({sortedValues, users, title}) => {
  return (
    <div className={"text leaderboard"}>
      <div className={"leaderboard-name"}>{title}</div>
      <div className={"leaderboard-items"}>
        {sortedValues.map((userValue, index) => {
          let userDetails = getUserWithId(users, userValue[0])
          let userRole = getReadableRole(userDetails.role)
          let leaderboardItemClassName = index === 0 ? "leader " : ""
          return (
            <div key={index} className={"leaderboard-item " + leaderboardItemClassName + userRole.className}>
              <div className={"leaderboard-item-user-info"}>
                <Image className={"leaderboard-item-picture"} src={userDetails.profilePictureUri}/>
                <div className={"leaderboard-item-stripe " + userRole.className}/>
                <div className={"leaderboard-item-user"}>
                  {userDetails.osuName}
                </div>
              </div>
              <div className={"leaderboard-item-amount"}>
                {userValue[1]}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomeStatistics