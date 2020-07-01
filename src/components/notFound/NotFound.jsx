import React from "react"
import {Statistic} from "semantic-ui-react"

const NotFound = () => {
  return (
    <Statistic inverted className={"not-found-page"} size={"huge"}>
      <Statistic.Value>404</Statistic.Value>
      <Statistic.Label>Page not Found</Statistic.Label>
    </Statistic>
  )
}

export default NotFound