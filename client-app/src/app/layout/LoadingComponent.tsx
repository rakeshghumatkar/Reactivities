import { Dimmer, Loader } from 'semantic-ui-react'

interface Prop {
    inverted?: boolean,
    content?: string
}

export const LoadingComponent = ({ inverted = true, content = "Loading" }: Prop) => {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content}></Loader>
        </Dimmer>
    )
}
