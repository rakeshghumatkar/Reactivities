import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Item, Label } from 'semantic-ui-react'
import { Activity } from '../../../../Models/Activity'
import { useStore } from '../../../../stores/store'
interface Prop {
    activity : Activity
}
const ActivityListItem = ({activity } : Prop) => {
    const { activityStore } = useStore();
    const { deleteActivity, loading } = activityStore;
    const [target, setTarget] = useState('')
    function handleDelete(e: any, id: string) {
        setTarget(e.target.value);
        deleteActivity(id);
    }
  return (
    <>
          <Item key={activity.id}>
              <Item.Content>
                  <Item.Header as='a'>{activity.title}</Item.Header>
                  <Item.Meta>{activity.date}</Item.Meta>
                  <Item.Description>
                      <div>{activity.description}</div>
                      <div>{activity.city}, {activity.category}</div>
                  </Item.Description>
                  <Item.Extra>
                      <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View" color="blue" />
                      <Button name={activity.id} loading={loading && target === activity.id} floated="right" content="Delete" color="red" onClick={(e) => handleDelete(e, activity.id)} />
                      <Label basic content={activity.category} />
                  </Item.Extra>
              </Item.Content>
          </Item>
    </>
  )
}

export default ActivityListItem