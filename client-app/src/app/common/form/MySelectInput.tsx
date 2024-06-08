import { useField } from 'formik'
import { Form, Label, Select } from 'semantic-ui-react'

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    options: any;
}

const MySelectInput = (props: Props) => {
    const [field, meta, helpers] = useField(props.name);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select
                clearable
                options={props.options}
                placeholder={props.placeholder}
                value={field.value || null}
                onChange={(e, d) => helpers.setValue(d.value)}
                onBlur={() => helpers.setTouched(true)}
            />
            {
                (meta.touched && meta.error) ?
                    (<Label basic color='red' content={meta.error} />) : null
            }
        </Form.Field>
    )
}

export default MySelectInput;