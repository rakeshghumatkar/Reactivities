import { useField } from 'formik'
import { Form, Label } from 'semantic-ui-react'

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
}

const InputTextBox = (props: Props) => {
    const [field, meta] = useField(props.name);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props}></input>
            {
                (meta.touched && meta.error) ?
                    (<Label basic color='red' content={meta.error} />) : null
            }
        </Form.Field>
    )
}

export default InputTextBox;