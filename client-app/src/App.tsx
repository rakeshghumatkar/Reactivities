import { useEffect, useState } from 'react'
import './App.css'
import { ducks } from './demo'
import DuckItem from './DuckItem'
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

interface Activity {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  city: string;
  venue: string;
}

function App() {
  
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities")
      .then(res => {
        setActivities(res.data);
      })
      .catch(err => {
        console.error("Error fetching activities:", err);
      });
  }, []);


  return (
    <>
    <Header as= 'h2' icon="users" content="Reactivities" />
    <List>
    {activities.map((activity : Activity)=>(
        <div key={activity.id}>
          <List.Item>{activity.title}</List.Item>
          </div>
    ))
    }
    </List>
    </>
  )
}

export default App
