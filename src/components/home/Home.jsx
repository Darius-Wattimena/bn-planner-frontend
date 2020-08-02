import {Container} from "semantic-ui-react"
import React from "react"
import HomeStatistics from "./HomeStatistics"
import "./Home.scss"

const Home = ({users}) => {
  return (
    <div className={"base-container"}>
      <Container fluid>
        <div className={"section"}>
          <div className={"section-title"}>Home</div>
          <div className={"section-container"}>
            <div className={"text"}>TODO : SOME FANCY EXPLANATION COMES HERE</div>
          </div>
        </div>

        <div className={"section"}>
          <div className={"section-title"}>Statistics</div>
          <div className={"section-container"}>
            <HomeStatistics users={users} />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Home