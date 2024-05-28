import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useState } from "react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";


export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { deleteActivity, loading, activitiesByDate } = activityStore;
    const [target, setTarget] = useState('')
    function handleDelete(e: any, id: string) {
        setTarget(e.target.value);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map((activity) => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.category}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated="right" content="View" color="blue" onClick={() => activityStore.selectedActivity(activity.id)} />
                                <Button name={activity.id} loading={loading && target === activity.id} floated="right" content="Delete" color="red" onClick={(e) => handleDelete(e, activity.id)} />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))
                }
            </Item.Group>
        </Segment>
    )
})
