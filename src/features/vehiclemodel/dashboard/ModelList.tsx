import React from 'react'
import { Segment, Table, Button, Menu, Icon } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import { observer } from 'mobx-react-lite'
import { Link} from 'react-router-dom'
import ModelListItem from './ModelListItem'


export default observer(function MakeList() {
  const{modelStore}=useStore();
  const{vehicleModels}=modelStore;

  return (
    <Segment fluid>
      <Button as={Link} to='/createmodel' positive content="Create VehicleModel" />
      <Table celled inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ModelId</Table.HeaderCell>
            <Table.HeaderCell>ModelName</Table.HeaderCell>
            <Table.HeaderCell>ModelAbrv</Table.HeaderCell>
            <Table.HeaderCell>MakeId</Table.HeaderCell>
            <Table.HeaderCell>View Content</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {vehicleModels.map((model) => (
          <ModelListItem key={model.id} model={model}/>
        ))}
         <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='6'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
      </Table>
    </Segment>
  )
})
