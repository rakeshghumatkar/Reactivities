import { Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./dashboard/ActivityListItem";


export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { activitiesByDate } = activityStore;


    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map((activity) => (
                    <ActivityListItem activity={activity} />
                ))
                }
            </Item.Group>
        </Segment>
    )
})
