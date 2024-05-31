import { Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Grid, GridColumn, Image } from "semantic-ui-react";
import { useStore } from "../../../../stores/store";
import { LoadingComponent } from "../../../LoadingComponent";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";



export default observer(function ActivityDetails() {

    const { activityStore } = useStore();
    const { loadActivity, loadingInitial } = activityStore;
    const { selectActivity: activity } = activityStore;
    const { id } = useParams();

    useEffect(() => {
        if (id)
            loadActivity(id);
    }, [loadActivity, id])


    if (loadingInitial || !activity) {
        return <LoadingComponent />
    }
    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat />
            </GridColumn>
            <GridColumn width={6}>
                <ActivityDetailedSidebar />
            </GridColumn>
        </Grid>
    )
})