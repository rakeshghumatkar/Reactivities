import { useEffect, useState } from 'react'
import { Button, Header, Segment } from 'semantic-ui-react'
import { useStore } from '../../../../stores/store';
import { observer } from 'mobx-react-lite';
import { LoadingComponent } from '../../../LoadingComponent';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Activity } from '../../../../Models/Activity';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import InputTextBox from '../../../../common/form/InputTextBox';
import InputTextArea from '../../../../common/form/InputTextArea';
import MySelectInput from '../../../../common/form/MySelectInput';
import { categoryOptions } from '../../../../common/options/categoryOptions';
import MyDateInput from '../../../../common/form/MyDateInput';

const ActivityForm = () => {

    const { activityStore } = useStore();
    const { selectActivity: selectedActivity, createActivity, updateActivity, loading, loadingInitial, loadActivity } = activityStore
    const initialForm = {
        id: '',
        title: '',
        date: null,
        description: '',
        category: '',
        city: '',
        venue: ''
    }
    const [activity, setActivity] = useState<Activity>(initialForm);
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate()

    const ValidationSchema = Yup.object(
        {
            title: Yup.string().required("The activity title is required"),
            description: Yup.string().required(),
            date: Yup.string().required("The Activity date is required"),
            venue: Yup.string().required(),
            city: Yup.string().required(),
            category: Yup.string().required()
        }
    )

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!));
        }
        else {
            setActivity(initialForm);
        }
    }, [id, loadActivity, location.key])

    // const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { name, value } = e.target;
    //     setActivity({ ...activity, [name]: value });
    // }

    function handleFormSubmit(activity: Activity) {
        if (!id) {
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
        else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }

    if (loadingInitial)
        return <LoadingComponent content='Activity loading ...' />

    return (
        <Segment clearing>
            <Formik
                validationSchema={ValidationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={e => handleFormSubmit(e)}>
                {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit}>
                        <Header content="Activity Details" sub color="teal" />
                        {/* <FormField>
                            <InputTextBox placeholder="Title" name='title' />
                            <ErrorMessage name="title" render={error => <Label basic color='red' content={error} />}></ErrorMessage>
                        </FormField> */}
                        <InputTextBox placeholder="Title" name='title' />
                        <InputTextArea rows={3} placeholder="Description" name='description' />
                        <MySelectInput options={categoryOptions} placeholder="Category" name='category' />
                        <MyDateInput
                            placeholderText="Date"
                            name='date'
                            timeCaption='time'
                            showTimeSelect
                            dateFormat='MMMM d, yyyy h:mm:aa'
                        />
                        <Header content="Location Details" sub color="teal" />
                        <InputTextBox placeholder="City" name='city' />
                        <InputTextBox placeholder="Venue" name='venue' />
                        <Button
                            positive floated='right'
                            type='submit'
                            content="Submit"
                            loading={loading}
                            disabled={isSubmitting || !dirty || !isValid}
                        />
                        <Button floated='right' as={Link} to={"/activities"} type='button' content="Cancel" />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
}

export default observer(ActivityForm)

function uuid(): string {
    throw new Error('Function not implemented.');
}

