import React from "react";
import {Grid} from "semantic-ui-react";
import {BEATMAP_STATUS, USER_ROLES} from "../../Constants";

const HomeListExplanation = () => {

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <div className={"text-group text-group-table"}>
              <div className={"text-group-name"}>Beatmap status</div>
              <div className={"text-group-items"}>
                <ItemsExplanation items={BEATMAP_STATUS}/>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <div className={"text-group text-group-table"}>
              <div className={"text-group-name"}>User roles</div>
              <div className={"text-group-items"}>
                <ItemsExplanation items={USER_ROLES}/>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

const ItemsExplanation = ({items}) => {
  let preparedItems = Object.entries(items)

  return (
    <>
      {preparedItems.map((item, index) => {
        return <ItemExplanation item={item} key={index}/>
      })}
    </>
  )
}

const ItemExplanation = ({item}) => {
  let value = item[1]

  return (
    <div className={"text-group-item"} key={value.id}>
      <div className={"text-group-item-badge " + value.className}>{value.name}</div>
      <div className={"text-group-item-explanation"}>
        {value.explanation}
      </div>
    </div>
  )
}


export default HomeListExplanation