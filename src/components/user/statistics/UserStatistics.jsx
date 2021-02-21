import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-fetching-library'
import Api from '../../../resources/Api'
import dayjs, { unix } from 'dayjs'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { Grid } from 'semantic-ui-react'
import { getReadableRole, getUserWithId } from '../../../util/UserUtil'

const UserStatistics = ({ userId, users, hasStatistics, setHasStatistics }) => {
  const now = dayjs().startOf('month')
  const nowTimestamp = now.unix()
  const oneYearAgoTimestamp = now.subtract(1, 'year').unix()
  const oneMonthAgoTimestamp = now.subtract(1, 'month').unix()
  const [preparedData, setPreparedData] = useState(null)
  const [preparedPieData, setPreparedPieData] = useState(null)

  const barcharFilter = {
    osuId: userId,
    start: oneYearAgoTimestamp,
    end: nowTimestamp,
    type: 'MONTHLY'
  }

  const piechartFilter = {
    osuId: userId,
    start: oneMonthAgoTimestamp,
    end: nowTimestamp,
    type: 'MONTHLY'
  }

  const barchartRequest = Api.fetchUserStatisticsByFilter(barcharFilter)
  const piechartRequest = Api.fetchUserStatisticsByFilter(piechartFilter)
  const { payload } = useQuery(barchartRequest)
  const { payload: piePayload } = useQuery(piechartRequest)

  function mapReadableTimestamps (payload, setPreparedData) {
    const preparedData = []

    for (const item of payload) {
      item.readableTimestamp = unix(item.timestamp).format('MMMM')
      preparedData.push(item)
    }

    setPreparedData(preparedData)
  }

  const barHasData = (payload !== undefined && payload.length > 0)
  const pieHasData = (piePayload !== undefined && piePayload.length > 0)

  useEffect(() => {
    if (barHasData === true || pieHasData === true) {
      setHasStatistics(true)

      if (barHasData === true) {
        mapReadableTimestamps(payload, setPreparedData)
      }

      if (pieHasData === true) {
        mapReadableTimestamps(piePayload, setPreparedPieData)
      }
    }
  }, [payload, piePayload, setHasStatistics, barHasData, pieHasData])

  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload) {
      const data = payload[0].payload
      return (
        <div className='custom-tooltip'>
          <p>{data.readableTimestamp}</p>
        </div>
      )
    }

    return null
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      const data = payload[0].payload
      const userDetails = getUserWithId(users, data.otherNominatorOsuId)
      return (
        <div className='custom-tooltip'>
          {userDetails &&
            <p>{userDetails.osuName}: {data.totalRanked}</p>
          }
        </div>
      )
    }

    return null
  }

  return (
    <>
      { hasStatistics === true &&
        <>
          { barHasData === true &&
            <Grid.Column computer={8} tablet={16} mobile={16}>
              <ResponsiveContainer width={'100%'} height={200}>
                <BarChart
                  data={preparedData}
                  margin={{
                    top: 5, bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray='1 1' />
                  <XAxis dataKey={'name'} />
                  <YAxis />
                  <Legend />
                  <Tooltip content={CustomBarTooltip}/>
                  <Bar stackId='a' dataKey='totalPending' name={'Pending'} fill={'#538ea5'} />
                  <Bar stackId='a' dataKey='totalUnfinished' name={'Unfinished'} fill={'#6253a5'} />
                  <Bar stackId='a' dataKey='totalNominated' name={'Nominated'} fill={'#2da554'} />
                  <Bar stackId='a' dataKey='totalBubbled' name={'Bubbled'} fill={'#2b56a5'} />
                  <Bar stackId='a' dataKey='totalDisqualified' name={'Disqualified'} fill={'#a54e4b'} />
                  <Bar stackId='a' dataKey='totalPopped' name={'Popped'} fill={'#a57d5d'} />
                  <Bar stackId='a' dataKey='totalRanked' name={'Ranked'} fill={'#5aa500'} />
                  <Bar stackId='a' dataKey='totalGraved' name={'Graved'} fill={'#a5a5a5'} />
                </BarChart>
              </ResponsiveContainer>
            </Grid.Column>
          }
          { pieHasData === true && preparedPieData &&
            <Grid.Column computer={8} tablet={16} mobile={16}>
              <ResponsiveContainer width={'100%'} height={200}>
                <PieChart>
                  <Tooltip content={CustomTooltip}/>
                  <Pie
                    data={preparedPieData[0].iconPairs}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='totalRanked'>
                    {
                      preparedPieData[0].iconPairs.map((entry, index) => {
                        const userDetails = getUserWithId(users, entry.otherNominatorOsuId)
                        let fillColor

                        if (userDetails) {
                          const roleDetails = getReadableRole(userDetails.role)

                          if (roleDetails && roleDetails.cellColor) {
                            fillColor = roleDetails.cellColor
                          } else {
                            fillColor = '#c9c9c9'
                          }
                        } else {
                          fillColor = '#c9c9c9'
                        }

                        return (
                          <Cell key={`cell-${index}`} fill={fillColor}/>
                        )
                      })
                    }
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Grid.Column>
          }
        </>
      }
    </>
  )
}

export default UserStatistics
