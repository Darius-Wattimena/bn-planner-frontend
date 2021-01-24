import React, {useEffect, useState} from "react"
import {useQuery} from "react-fetching-library"
import Api from "../../../resources/Api"
import dayjs from "dayjs"
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
} from "recharts";
import {Grid} from "semantic-ui-react";
import {getReadableRole, getUserWithId} from "../../../util/UserUtil";

const UserStatistics = ({userId, users}) => {
  let now = dayjs().startOf("month")
  let nowTimestamp = now.unix()
  let oneYearAgoTimestamp = now.subtract(1, "year").unix()
  let oneMonthAgoTimestamp = now.subtract(1, "month").unix()

  const filter = {
    "osuId": userId,
    "start": oneYearAgoTimestamp,
    "end": nowTimestamp,
    "type": "MONTHLY"
  }

  const yearlyFilter = {
    "osuId": userId,
    "start": oneMonthAgoTimestamp,
    "end": nowTimestamp,
    "type": "MONTHLY"
  }

  let barchartRequest = Api.fetchUserStatisticsByFilter(filter)
  let piechartRequest = Api.fetchUserStatisticsByFilter(yearlyFilter)
  const {loading, payload} = useQuery(barchartRequest)
  const {loading: pieLoading, payload: piePayload} = useQuery(piechartRequest)

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      let data = payload[0].payload
      let userDetails = getUserWithId(users, data.otherNominatorOsuId)
      return (
        <div className="custom-tooltip">
          {userDetails &&
            <p>{userDetails.osuName}: {data.totalRanked}</p>
          }
        </div>
      );
    }

    return null;
  };

  let pieHasData = (piePayload !== undefined && piePayload.length > 0)

  return (
    <>
      {payload && piePayload && loading === false && pieLoading === false &&
        <>
          <Grid.Column computer={8} tablet={16} mobile={16}>
            <ResponsiveContainer width={"100%"} height={200}>
              <BarChart
                data={payload}
                margin={{
                  top: 5, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <Bar stackId="a" dataKey="totalPending" name={"Pending"} fill={"#538ea5"} />
                <Bar stackId="a" dataKey="totalUnfinished" name={"Unfinished"} fill={"#6253a5"} />
                <Bar stackId="a" dataKey="totalNominated" name={"Nominated"} fill={"#2da554"} />
                <Bar stackId="a" dataKey="totalBubbled" name={"Bubbled"} fill={"#2b56a5"} />
                <Bar stackId="a" dataKey="totalDisqualified" name={"Disqualified"} fill={"#a54e4b"} />
                <Bar stackId="a" dataKey="totalPopped" name={"Popped"} fill={"#a57d5d"} />
                <Bar stackId="a" dataKey="totalRanked" name={"Ranked"} fill={"#5aa500"} />
                <Bar stackId="a" dataKey="totalGraved" name={"Graved"} fill={"#a5a5a5"} />
              </BarChart>
            </ResponsiveContainer>
          </Grid.Column>
          <Grid.Column computer={8} tablet={16} mobile={16}>
            <ResponsiveContainer width={"100%"} height={200}>
              <PieChart>
                <Tooltip content={CustomTooltip}/>
                {pieHasData === true &&
                  <Pie
                    data={piePayload[0].iconPairs}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="totalRanked">
                    {
                      piePayload[0].iconPairs.map((entry, index) => {
                        let userDetails = getUserWithId(users, entry.otherNominatorOsuId)
                        let fillColor

                        if (userDetails) {
                          let roleDetails = getReadableRole(userDetails.role)

                          if (roleDetails && roleDetails.cellColor) {
                            fillColor = roleDetails.cellColor
                          } else {
                            fillColor = "#c9c9c9"
                          }
                        } else {
                          fillColor = "#c9c9c9"
                        }

                        return(
                          <Cell key={`cell-${index}`} fill={fillColor} />
                        )
                      })
                    }
                  </Pie>
                }
                {pieHasData === false &&
                  <div>No Data</div>
                }
              </PieChart>
            </ResponsiveContainer>
          </Grid.Column>
        </>
      }
    </>
  )
}

export default UserStatistics