import React, { useEffect } from 'react'
import { Card, Button } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {Link, useParams} from 'react-router-dom'
import { observer } from 'mobx-react-lite';

export default observer(function MakeDetails() {

  const {makeStore}=useStore();
  const{selectedMake:vehicleMake, loadMake, loadingInitial}=makeStore;
  const{id}=useParams<{id:string}>();

  useEffect(()=>{
    if(id) loadMake(id);
  },[id, loadMake]);

  if(loadingInitial||!vehicleMake) return <LoadingComponent content={'Loading...'}/>;

  return (
    <Card fluid>
    <Card.Content>
      <Card.Header>{vehicleMake.makeName}</Card.Header>
      <Card.Meta>
        <span>{vehicleMake.makeAbrv}</span>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
        <Button.Group widths="2">
            <Button as={Link} to={`/manage/${vehicleMake.id}`} basic color="blue" content="Edit"/>
            <Button as={Link} to="/vehiclemakes" basic color="grey" content="Cancel"/>
            </Button.Group>
    </Card.Content>
  </Card>
  )
})
