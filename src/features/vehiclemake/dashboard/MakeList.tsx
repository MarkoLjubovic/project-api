import React from 'react'
import { Segment, Table, Button, Menu, Icon } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import { observer } from 'mobx-react-lite'
import { Link} from 'react-router-dom'
import MakeListItem from './MakeListItem'


export default observer(function MakeList() {
  const{makeStore}=useStore();
  const{vehicleMakes}=makeStore;

  return (
    <Segment fluid>
      <Button as={Link} to='/createmake' positive content="Create VehicleMake" />
      <Table celled inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>MakeId</Table.HeaderCell>
            <Table.HeaderCell>MakeName</Table.HeaderCell>
            <Table.HeaderCell>MakeAbrv</Table.HeaderCell>
            <Table.HeaderCell>View Content</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {vehicleMakes.map((make) => (
          <MakeListItem key={make.id} make={make}/>
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
