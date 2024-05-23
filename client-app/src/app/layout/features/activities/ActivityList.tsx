import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../Models/Activity";
interface Prop {
    activities: Activity[];
    selectActivity: (Id: string) => void;
    deleteActivity: (Id: string) => void;
}
export default function ActivityList({ activities, selectActivity, deleteActivity }: Prop) {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map((activity) => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.category}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated="right" content="View" color="blue" onClick={() => selectActivity(activity.id)} />
                                <Button floated="right" content="Delete" color="red" onClick={() => deleteActivity(activity.id)} />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))
                }
            </Item.Group>
        </Segment>
    )
}