import { ErrorMessage, Form, Formik } from 'formik'
import { Button, Label } from 'semantic-ui-react'
import InputTextBox from '../../common/form/InputTextBox'
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';

const Login = () => {

    const { userStore } = useStore();
    return (
        <>
            <Formik
                initialValues={{ email: "", password: "", error: null }}
                onSubmit={(value, { setErrors }) => userStore.login(value).catch((error) => {
                    setErrors({ error: "Invalid email or password" })
                })}
            >
                {
                    ({ handleSubmit, isSubmitting, errors }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                            <InputTextBox placeholder='email' name='email' />
                            <InputTextBox placeholder='password' name='password' type='password' />
                            <ErrorMessage name='error' render={() =>
                                <Label content={errors.error} style={{ marginBottom: 10 }} basic color='red' />}
                            />
                            <Button positive loading={isSubmitting} content="Submit" type='submit' fluid />
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}

export default observer(Login);
