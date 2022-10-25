import { observer } from 'mobx-react-lite';
import React, { useState,ChangeEvent, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { Segment, Form, Button } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';

export default observer(function ModelForm() {

  const history=useHistory();
  const{modelStore}=useStore();
  const{createModel,updateModel,loading,loadModel, loadingInitial}=modelStore;
  const{id}=useParams<{id:string}>();

  const [vehicleModel, setVehicleModel]=useState({
    id:'',
    modelName:'',
    modelAbrv:'',
    makeId:''
  });

  useEffect(()=>{
    if(id)loadModel(id).then(vehicleModel=>setVehicleModel(vehicleModel!))
  },[id,loadModel]);

  function handleSubmit(){
    if(vehicleModel.id.length=== 0){
      let newModel={
        ...vehicleModel,
        id:uuid()
      };
      createModel(newModel).then(()=>history.push(`/vehiclemodels/${newModel.id}`))
    }
    else{
      updateModel(vehicleModel).then(()=>history.push(`/vehiclemodels/${vehicleModel.id}`))
    }
  }

  function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
      const{name,value}=event.target;
      setVehicleModel({...vehicleModel,[name]:value})
  }

  if(loadingInitial) return<LoadingComponent content='Loading VehicleModel...'/>

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input placeholder='ModelName' value={vehicleModel.modelName} name='modelName' onChange={handleInputChange}/>
        <Form.Input placeholder='ModelAbrv'value={vehicleModel.modelAbrv} name='modelAbrv' onChange={handleInputChange}/>
        <Form.Input placeholder='MakeId'value={vehicleModel.makeId} name='makeId' onChange={handleInputChange}/>
        <Button loading={loading} floated="right" positive type="submit" content="Submit"/>
        <Button as={Link} to='/vehiclemakes' floated="right" type="button" content="Cancel"/>
      </Form>
    </Segment>
  )
})
