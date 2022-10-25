import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Table} from 'semantic-ui-react'
import {VehicleModel} from '../../../app/models/vehiclemodel'
import { useStore } from '../../../app/stores/store'

interface Props{
    model:VehicleModel

}

export default function ModelListItem({model}:Props){

  const{modelStore}=useStore();
  const{deleteModel, loading}=modelStore;
  const[target,setTarget]=useState('');

  function handleModelDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
    setTarget(e.currentTarget.name);
    deleteModel(id);
  }
  
    return(
        <Table.Body key={model.id}>
        <Table.Row>
          <Table.Cell>{model.id}</Table.Cell>
          <Table.Cell>{model.modelName}</Table.Cell>
          <Table.Cell>{model.modelAbrv}</Table.Cell>
          <Table.Cell>{model.makeId}</Table.Cell>
          <Table.Cell>
            <Button as={Link} to={`/vehiclemakes/${model.id}`} color="blue" content="View" />
            <Button name={model.id} loading={loading && target===model.id} onClick={(e)=>handleModelDelete(e,model.id)} color="red" content="Delete" />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    )
}