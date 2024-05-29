import { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../../stores/store';
import { observer } from 'mobx-react-lite';
import { LoadingComponent } from '../../../LoadingComponent';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Activity } from '../../../../Models/Activity';
import { v4 as uuid } from 'uuid';


const ActivityForm = () => {

    const { activityStore } = useStore();
    const { selectActivity: selectedActivity, createActivity, updateActivity, loading, loadingInitial, loadActivity } = activityStore
    const initialForm = {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }
    const [activity, setActivity] = useState<Activity>(initialForm);
    const { id } = useParams();
    const location = useLocation();
    const navigator = useNavigate();
    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!));
        }
        else {
            setActivity(initialForm);
        }
    }, [id, loadActivity, location.key])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setActivity({ ...activity, [name]: value });
    }

    function handleSubmit() {
        debugger
        if (!id) {

            activity.id = uuid();
            createActivity(activity).then(() => navigator(`/activities/${activity.id}`));

        }
        else {
            updateActivity(activity).then(() => navigator(`/activities/${activity.id}`))
        }
    }
    if (loadingInitial)
        return <LoadingComponent content='Activity loading ...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder="Title" name='title' value={activity?.title} onChange={onChangeHandler}></Form.Input>
                <Form.TextArea placeholder="Description" name='description' value={activity?.description} onChange={onChangeHandler} />
                <Form.Input placeholder="Category" name='category' value={activity?.category} onChange={onChangeHandler}></Form.Input>
                <Form.Input placeholder="Date" name='date' type='date' value={activity?.date} onChange={onChangeHandler}></Form.Input>
                <Form.Input placeholder="City" name='city' value={activity?.city} onChange={onChangeHandler}></Form.Input>
                <Form.Input placeholder="Venue" name='venue' value={activity?.venue} onChange={onChangeHandler}></Form.Input>
                <Button positive floated='right' type='submit' content="Submit" loading={loading} />
                <Button floated='right' as={Link} to={"/activities"} type='button' content="Cancel" />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)

