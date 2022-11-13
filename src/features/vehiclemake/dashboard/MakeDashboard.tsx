import React, { useEffect } from 'react'
import MakeList from './MakeList'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import { observer } from 'mobx-react-lite'
import LoadingComponent from '../../../app/layout/LoadingComponent'

export default observer(function MakeDashboard() {
  const { makeStore } = useStore()

  //   useEffect(() => {
  //     const fetchPosts=async()=>{
  //       makeStore.loadMakes()
  //     }
  //     fetchPosts();
  // }, [makeStore])

  useEffect(() => {
    const fetchPosts=async()=>{
      const response=await makeStore.loadPagingMakes()
      console.log(response)
      //await makeStore.loadPagingMakes()
    }
    fetchPosts()
  }, [])

  if (makeStore.loadingInitial)
    return <LoadingComponent content="Loading app" />

  return (
    <Grid>
      <Grid.Column width="16">
        <MakeList />
      </Grid.Column>
    </Grid>
  )
})
