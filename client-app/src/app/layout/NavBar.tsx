import { Button, Container, Menu } from "semantic-ui-react";
interface Prop {
    openForm: () => void;

}
export default function NavBar({ openForm }: Prop) {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/asserts/logo.png" alt="logo" style={{ marginRight: "10px" }} />
                    Reactivity
                </Menu.Item>
                <Menu.Item name="Activity" />
                <Menu.Item>
                    <Button positive content="Create Activity" onClick={openForm} />
                </Menu.Item>
            </Container>
        </Menu>
    )

}