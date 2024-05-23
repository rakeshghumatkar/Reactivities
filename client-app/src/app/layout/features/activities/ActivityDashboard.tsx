import { Grid, List } from "semantic-ui-react"
import { Activity } from "../../../Models/Activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "./details/ActivityDetails";
import ActivityForm from "./form/ActivityForm";

interface Prop {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (Id: string) => void;
    handleCancelActivity: () => void;
    editMode: boolean;
    openForm: (Id: string) => void;
    closeForm: () => void;
    editOrCreate: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}


export function ActivityDashboard({
    activities, selectedActivity, deleteActivity,
    selectActivity, handleCancelActivity, editMode,
    openForm, closeForm, editOrCreate }: Prop) {

    return (
        <>
            <Grid>
                <Grid.Column width="10">
                    <ActivityList
                        activities={activities}
                        selectActivity={selectActivity}
                        deleteActivity={deleteActivity}
                    />
                </Grid.Column>
                <Grid.Column width="6">
                    {
                        selectedActivity && !editMode &&
                        <ActivityDetails
                            activity={selectedActivity}
                            handleCancelActivity={handleCancelActivity}
                            editMode={editMode}
                            openForm={openForm}
                            closeForm={closeForm}
                        />
                    }
                    {
                        editMode &&
                        <ActivityForm
                            closeForm={closeForm}
                            selectedActivity={selectedActivity}
                            editOrCreate={editOrCreate}
                        />
                    }

                </Grid.Column>

            </Grid>
        </>
    )
}