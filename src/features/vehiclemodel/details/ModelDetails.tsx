import React, { useEffect } from 'react'
import { Card, Button } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {Link, useParams} from 'react-router-dom'
import { observer } from 'mobx-react-lite';

export default observer(function ModelDetails() {

  const {modelStore}=useStore();
  const{selectedModel:vehicleModel, loadModel, loadingInitial}=modelStore;
  const{id}=useParams<{id:string}>();

  useEffect(()=>{
    if(id) loadModel(id);
  },[id, loadModel]);

  if(loadingInitial||!vehicleModel) return <LoadingComponent content={'Loading...'}/>;

  return (
    <Card fluid>
    <Card.Content>
      <Card.Header>{vehicleModel.modelName}</Card.Header>
      <Card.Meta>
        <span>{vehicleModel.modelAbrv}</span>
        <span>{vehicleModel.makeId}</span>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
        <Button.Group widths="2">
            <Button as={Link} to={`/manage/${vehicleModel.id}`} basic color="blue" content="Edit"/>
            <Button as={Link} to="/vehiclemodels" basic color="grey" content="Cancel"/>
            </Button.Group>
    </Card.Content>
  </Card>
  )
})
