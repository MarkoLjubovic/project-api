import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Table} from 'semantic-ui-react'
import {VehicleMake} from '../../../app/models/vehiclemake'
import { useStore } from '../../../app/stores/store'

interface Props{
    make:VehicleMake
    key:string
}

export default function MakeListItem({make}:Props){

  console.log(make);
  const{makeStore}=useStore();
  const{deleteMake, loading}=makeStore;
  const[target,setTarget]=useState('');

  function handleMakeDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
    setTarget(e.currentTarget.name);
    deleteMake(id);
  }
  
    return(
        <Table.Body key={make.id}>
        <Table.Row>
          <Table.Cell>{make.id}</Table.Cell>
          <Table.Cell>{make.makeName}</Table.Cell>
          <Table.Cell>{make.makeAbrv}</Table.Cell>
          <Table.Cell>
            <Button as={Link} to={`/vehiclemakes/${make.id}`} color="blue" content="View" />
            <Button name={make.id} loading={loading && target===make.id} onClick={(e)=>handleMakeDelete(e,make.id)} color="red" content="Delete" />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    )
}