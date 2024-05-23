import { Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { Activity } from "../../../../Models/Activity";
interface Prop {
    activity: Activity
    handleCancelActivity: () => void;
    editMode: boolean;
    openForm: (Id: string) => void;
    closeForm: () => void;
    
}
export default function ActivityDetails({ activity, handleCancelActivity,
    editMode, closeForm, openForm }: Prop) {
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
                    <Button color='blue' content="Edit" onClick={() => {openForm(activity.id); }} ></Button>
                    <Button color='grey' content="Cancel" onClick={handleCancelActivity}></Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    )
}