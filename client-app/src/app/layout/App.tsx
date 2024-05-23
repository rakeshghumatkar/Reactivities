import { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../Models/Activity';
import NavBar from './NavBar';
import { ActivityDashboard } from './features/activities/ActivityDashboard';
import { v4 as uuid } from 'uuid';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  function selectActivity(Id: string) {
    setSelectedActivity(activities.find(x => x.id === Id))
  }

  function handleCancelActivity() {
    setSelectedActivity(undefined);
  }

  function handleOpenForm(id?: string) {
    id ? selectActivity(id) : handleCancelActivity;
    setEditMode(true);
  }

  function handleCreteForm() {
    setSelectedActivity(undefined);
    setEditMode(true);
  }

  function handleCloseForm() {
    setEditMode(false);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities")
      .then(res => {
        setActivities(res.data);
      })
      .catch(err => {
        console.error("Error fetching activities:", err);
      });
  }, []);
  const handleCreateOrEditActivity = (activity: Activity) => {
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) :
      setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  }
  return (
    <>
      <NavBar openForm={handleCreteForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={selectActivity}
          handleCancelActivity={handleCancelActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
          editOrCreate={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  )
}

export default App
