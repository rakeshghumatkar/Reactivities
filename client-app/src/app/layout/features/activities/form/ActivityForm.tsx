import { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../../stores/store';
import { observer } from 'mobx-react-lite';


const ActivityForm = () => {

    const { activityStore } = useStore();
    const { selectActivity: selectedActivity, createActivity, updateActivity, loading } = activityStore
    const initialForm = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }
    const [activity, setActivity] = useState(initialForm);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setActivity({ ...activity, [name]: value });
    }

    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

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
                <Button floated='right' type='button' content="Cancel" onClick={activityStore.closeForm} />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)

