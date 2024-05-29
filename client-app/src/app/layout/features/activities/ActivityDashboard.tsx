import { Grid } from "semantic-ui-react"
import ActivityList from "./ActivityList";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { LoadingComponent } from "../../LoadingComponent";

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();

    useEffect(() => {
        if (activityStore.activityRegistry.size <= 1)
            activityStore.loadActivities();
    }, [activityStore.loadActivities]);

    if (activityStore.loadingInitial) {
        return <LoadingComponent content='Loading App' />
    }

    return (
        <>
            <Grid>
                <Grid.Column width="10">
                    <ActivityList />
                </Grid.Column>
            </Grid>
        </>
    )
})