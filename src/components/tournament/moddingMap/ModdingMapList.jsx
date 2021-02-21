import { Button, Icon, Table } from 'semantic-ui-react'
import React from 'react'
import { useHistory } from 'react-router-dom'

const ModdingMapList = ({ isAdmin, payload, setAddModalOpen }) => {
  const history = useHistory()
  return (
    <Table inverted selectable>
      <Table.Header>
        <Table.Row key={'user-list-header'} textAlign={'center'}>
          <Table.HeaderCell width={'2'}/>
          <Table.HeaderCell width={'3'}>Contest</Table.HeaderCell>
          <Table.HeaderCell width={'3'}>Artist</Table.HeaderCell>
          <Table.HeaderCell width={'3'}>Title</Table.HeaderCell>
          <Table.HeaderCell width={'3'}/>
          <Table.HeaderCell width={'2'}/>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {payload && payload.map((moddingMap, index) => {
          return (
            <Table.Row key={'user-list-' + index} className={'user-row'}>
              <Table.Cell width={'2'} textAlign={'center'}># {index + 1}</Table.Cell>
              <Table.Cell width={'3'} textAlign={'center'}>{moddingMap.contestId}</Table.Cell>
              <Table.Cell width={'3'} textAlign={'center'}>{moddingMap.artist}</Table.Cell>
              <Table.Cell width={'3'} textAlign={'center'}>{moddingMap.title}</Table.Cell>
              <Table.Cell width={'3'} textAlign={'center'}>
                <Button.Group fluid>
                  <Button
                    color={'blue'}
                    onClick={() => {
                      history.push(`/modding/maps/discussion/${moddingMap._id}`)
                    }}
                  >
                    <Icon fitted name={'discussions'}/> Map Discussion
                  </Button>
                </Button.Group>
              </Table.Cell>
              <Table.Cell width={'2'} textAlign={'center'}>
                <Button.Group fluid>
                  <Button
                    color={'green'}
                    onClick={() => window.open(moddingMap.downloadLink, '_blank')}
                  >
                    <Icon fitted name={'download'}/>
                  </Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
      <Table.Footer>
        <Table.Row key={'user-list-footer'}>
          <Table.HeaderCell width={'2'} textAlign={'center'}>
            {payload &&
            <p>{payload.length} Modding Map Found</p>
            }
          </Table.HeaderCell>
          <Table.HeaderCell width={'3'}/>
          <Table.HeaderCell width={'3'}/>
          <Table.HeaderCell width={'3'}/>
          <Table.HeaderCell width={'3'}/>
          <Table.HeaderCell width={'2'}>
            <Button disabled={!isAdmin} fluid color={isAdmin ? 'green' : 'grey'}
              onClick={() => setAddModalOpen(true)}><Icon name={'plus'}/> Add Map</Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default ModdingMapList
