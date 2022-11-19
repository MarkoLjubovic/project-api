import React from 'react'
import { Segment, Table, Button, Menu, Icon } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import { observer } from 'mobx-react-lite'
import { Link} from 'react-router-dom'
import MakeListItem from './MakeListItem'
import { toJS} from 'mobx'


export default observer(function MakeList() {
  const{makeStore}=useStore();
  const{vehiclePageMakes, handlePrePage, handleNextPage}=makeStore;
  

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
        <>      
        {toJS(vehiclePageMakes.map(pageMake =>{
          console.log(toJS(pageMake));
          return (
         <MakeListItem make={pageMake} key={pageMake.id}/>
          )
        }))}
        </>
         <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='6'>
          <Menu floated='right' pagination>
            <Menu.Item onClick={()=>{handlePrePage()}} icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item onClick={()=>{handleNextPage()}} icon>
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
