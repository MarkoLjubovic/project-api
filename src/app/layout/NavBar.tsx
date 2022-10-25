import React from 'react';
import { NavLink } from 'react-router-dom';

import {Container, Menu} from 'semantic-ui-react';

export default function NavBar(){
    return(
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item as={NavLink} exact to='/' header>
            Project WebAPI
          </Menu.Item>
          <Menu.Item as={NavLink} to='/vehiclemakes' name="VehicleMake"/>
          <Menu.Item as={NavLink} to='/vehiclemodels' name="VehicleModel"/>
        </Container>
      </Menu>
    )
}