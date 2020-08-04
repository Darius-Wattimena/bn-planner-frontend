import {Container} from "semantic-ui-react"
import React from "react"
import HomeStatistics from "./HomeStatistics"
import "./Home.scss"
import HomeExplanation from "./HomeExplanation";
import HomeListExplanation from "./HomeListExplanation";

const Home = ({users}) => {
  return (
    <div className={"base-container"}>
      <Container fluid>
        <div className={"section"}>
          <div className={"section-title"}>Home</div>
          <div className={"text section-container"}>
            <HomeExplanation />
          </div>
        </div>

        <div className={"section"}>
          <div className={"text section-container"}>
            <HomeListExplanation />
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