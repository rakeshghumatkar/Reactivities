import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
interface Prop {
    openForm: () => void;

}
export default function NavBar() {
    const { activityStore } = useStore();
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/asserts/logo.png" alt="logo" style={{ marginRight: "10px" }} />
                    Reactivity
                </Menu.Item>
                <Menu.Item name="Activity" />
                <Menu.Item>
                    <Button positive content="Create Activity" onClick={()=>activityStore.openForm()} />
                </Menu.Item>
            </Container>
        </Menu>
    )

}