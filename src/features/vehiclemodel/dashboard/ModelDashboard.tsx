import React, { useEffect } from 'react'
import ModelList from './ModelList'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import { observer } from 'mobx-react-lite'
import LoadingComponent from '../../../app/layout/LoadingComponent'

export default observer(function ModelDashboard() {
  const { modelStore } = useStore()

  useEffect(() => {
    modelStore.loadModels()
  }, [modelStore])

  if (modelStore.loadingInitial)
    return <LoadingComponent content="Loading app" />

  return (
    <Grid>
      <Grid.Column width="16">
        <ModelList />
      </Grid.Column>
    </Grid>
  )
})
