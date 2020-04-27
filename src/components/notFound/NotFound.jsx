import React from "react";
import {Statistic} from "semantic-ui-react";

const NotFound = () => {
  const style = {
    heigth: '100vh'
  };

  return (
    <Statistic inverted style={style}>
      <Statistic.Value>404</Statistic.Value>
      <Statistic.Label>Page not Found</Statistic.Label>
    </Statistic>
  )
};

export default NotFound