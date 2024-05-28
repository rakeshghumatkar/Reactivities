import { Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { Activity } from "../../../../Models/Activity";
import { useStore } from "../../../../stores/store";
import { LoadingComponent } from "../../../LoadingComponent";


export default function ActivityDetails() {

    const { activityStore } = useStore();
    const { selectActivity: activity } = activityStore;
    if (!activity) {
        return <LoadingComponent />
    }
    return (
        <Card>
            <Image src={`/asserts/categoryImages/${activity.category}.jpg`} />
            <CardContent>
                <CardHeader>{activity.title}</CardHeader>
                <CardMeta>
                    <span>{activity.date}</span>
                </CardMeta>
                <CardDescription>
                    {activity.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <ButtonGroup widths="2">
                    <Button color='blue' content="Edit" onClick={() => { activityStore.openForm(); }} ></Button>
                    <Button color='grey' content="Cancel" onClick={activityStore.handleCancelActivity}></Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    )
}