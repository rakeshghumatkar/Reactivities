import { Container, Header, Segment } from 'semantic-ui-react'
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

const ServerError = () => {
    const { commonStore } = useStore();
    return (
        <Container>
            <Header as='h1' content="Server Error" />
            <Header as='h5'>{commonStore.errors?.message}</Header>
            {
                commonStore.errors?.details &&
                <Segment>
                    <Header as='h4' content="Stack Trace" color='teal' />
                    <code style={{ margin: "10px" }} >{commonStore.errors.details}</code>
                </Segment>

            }
        </Container>
    )
}

export default observer(ServerError);