import { Grid, List } from "semantic-ui-react"
import { Activity } from "../../../Models/Activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "./details/ActivityDetails";
import ActivityForm from "./form/ActivityForm";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";



export default observer(function ActivityDashboard() {

    const {activityStore} = useStore()

    return (
        <>
            <Grid>
                <Grid.Column width="10">
                    <ActivityList />
                </Grid.Column>
                <Grid.Column width="6">
                    {
                        activityStore.selectActivity && !activityStore.editMode &&
                        <ActivityDetails/>
                    }
                    {
                        activityStore.editMode &&
                        <ActivityForm />
                    }

                </Grid.Column>

            </Grid>
        </>
    )
})