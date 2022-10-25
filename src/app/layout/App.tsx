import React from 'react'
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar'
import MakeDashboard from '../../features/vehiclemake/dashboard/MakeDashboard'
import { observer } from 'mobx-react-lite'
import { Route, useLocation} from 'react-router-dom'
import HomePage from '../../features/vehiclemake/home/HomePage'
import MakeForm from '../../features/vehiclemake/form/MakeForm'
import MakeDetails from '../../features/vehiclemake/details/MakeDetails'
import ModelDashboard from '../../features/vehiclemodel/dashboard/ModelDashboard'
import ModelDetails from '../../features/vehiclemodel/details/ModelDetails'
import ModelForm from '../../features/vehiclemodel/form/ModelForm'

function App() {
  const location=useLocation();
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/vehiclemakes" component={MakeDashboard} />
          <Route path="/vehiclemakes/:id" component={MakeDetails} />
          <Route key={location.key} path={["/createmake",'/manage/:id']} component={MakeForm} />
          <Route exact path="/vehiclemodels" component={ModelDashboard} />
          <Route path="/vehiclemodels/:id" component={ModelDetails} />
          <Route key={location.key} path={["/createmodel",'/manage/:id']} component={ModelForm} />
      </Container>
    </>
  )
}

export default observer(App)
