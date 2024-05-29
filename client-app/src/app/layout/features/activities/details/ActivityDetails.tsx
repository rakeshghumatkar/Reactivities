import { Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { store, useStore } from "../../../../stores/store";
import { LoadingComponent } from "../../../LoadingComponent";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

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
                    <Button as={Link} to={`/manage/${id}`} color='blue' content="Edit"  ></Button>
                    <Button as={Link} to={"/"} color='grey' content="Cancel" ></Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    )
})