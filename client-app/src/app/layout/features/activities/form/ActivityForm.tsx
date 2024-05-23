import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../../Models/Activity';
interface Prop {
    closeForm: () => void;
    selectedActivity: Activity | undefined;
    editOrCreate: (activity: Activity) => void;
}

const ActivityForm = ({ closeForm, selectedActivity, editOrCreate }: Prop) => {

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
        setActivity({ ...activity, [name]: [value] });
    }

    function handleSubmit() {
        editOrCreate(activity);
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder="Title" name='title' value={activity?.title} onChange={onChangeHandler}></Form.Input>
                <Form.TextArea placeholder="Description" name='description' value={activity?.description} onChange={onChangeHandler} />
                <Form.Input placeholder="Category" name='category' value={activity?.category} onChange={onChangeHandler}></Form.Input>
                <Form.Input placeholder="City" name='city' value={activity?.city} onChange={onChangeHandler}></Form.Input>
                <Form.Input placeholder="Venue" name='venue' value={activity?.venue} onChange={onChangeHandler}></Form.Input>
                <Button positive floated='right' type='submit' content="Submit" />
                <Button floated='right' type='button' content="Cancel" onClick={closeForm} />
            </Form>
        </Segment>
    )
}

export default ActivityForm