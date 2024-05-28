import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import { Activity } from '../Models/Activity';
import NavBar from './NavBar';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import ActivityDashboard from './features/activities/ActivityDashboard';


function App() {

  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <LoadingComponent content='Loading App' />
  }
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </>
  )
}

export default observer(App);