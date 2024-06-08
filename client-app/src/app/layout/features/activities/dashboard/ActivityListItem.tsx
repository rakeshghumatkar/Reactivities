import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, ItemDescription, ItemHeader, Label, Segment } from 'semantic-ui-react'
import { Activity } from '../../../../Models/Activity'
import { useStore } from '../../../../stores/store'
import { format } from 'date-fns/format'
interface Prop {
    activity: Activity
}
const ActivityListItem = ({ activity }: Prop) => {
    const { activityStore } = useStore();
    const { deleteActivity, loading } = activityStore;
    const [target, setTarget] = useState('')
    function handleDelete(e: any, id: string) {
        setTarget(e.target.value);
        deleteActivity(id);
    }
    return (
        <>
            <Segment.Group>
                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image size='tiny' circular src='asserts/user.png' />
                            <Item.Content>
                                <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                    {activity.title}
                                </Item.Header>
                                <ItemDescription>
                                    Hosted by Rakesh
                                </ItemDescription>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                <Segment>
                    <span>
                        <Icon name='clock' /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                        <Icon name='marker' />{activity.venue}
                    </span>
                </Segment>
                <Segment secondary>
                    Attendees go here
                </Segment>
                <Segment clearing>
                    <span>{activity.description}</span>
                    <Button
                        as={Link}
                        to={`/activities/${activity.id}`}
                        color='teal'
                        floated='right'
                        content='View'
                    />
                </Segment>


            </Segment.Group>
        </>
    )
}

export default ActivityListItem