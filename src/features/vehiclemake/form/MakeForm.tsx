import { observer } from 'mobx-react-lite';
import React, { useState,ChangeEvent, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { Segment, Form, Button } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';

export default observer(function MakeForm() {

  const history=useHistory();
  const{makeStore}=useStore();
  const{createMake,updateMake,loading,loadMake, loadingInitial}=makeStore;
  const{id}=useParams<{id:string}>();

  const [vehicleMake, setVehicleMake]=useState({
    id:'',
    makeName:'',
    makeAbrv:''
  });

  useEffect(()=>{
    if(id)loadMake(id).then(vehicleMake=>setVehicleMake(vehicleMake!))
  },[id,loadMake]);

  function handleSubmit(){
    if(vehicleMake.id.length=== 0){
      let newMake={
        ...vehicleMake,
        id:uuid()
      };
      createMake(newMake).then(()=>history.push(`/vehiclemakes/${newMake.id}`))
    }
    else{
      updateMake(vehicleMake).then(()=>history.push(`/vehiclemakes/${vehicleMake.id}`))
    }
  }

  function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
      const{name,value}=event.target;
      setVehicleMake({...vehicleMake,[name]:value})
  }

  if(loadingInitial) return<LoadingComponent content='Loading VehicleMake...'/>

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input placeholder='MakeName' value={vehicleMake.makeName} name='makeName' onChange={handleInputChange}/>
        <Form.Input placeholder='MakeAbrv'value={vehicleMake.makeAbrv} name='makeAbrv' onChange={handleInputChange}/>
        <Button loading={loading} floated="right" positive type="submit" content="Submit"/>
        <Button as={Link} to='/vehiclemakes' floated="right" type="button" content="Cancel"/>
      </Form>
    </Segment>
  )
})
