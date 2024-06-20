import { Button, Container, DropdownItem, Menu, Image, DropdownMenu, Dropdown } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { useEffect } from "react";

export default observer(function NavBar() {

    const { userStore: { user, logout } } = useStore();

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to={'/'} header>
                    <img src="/asserts/logo.png" alt="logo" style={{ marginRight: "10px" }} />
                    Reactivity
                </Menu.Item>
                <Menu.Item as={NavLink} to={'/activities'} name="Activity" />
                <Menu.Item as={NavLink} to={'/errors'} name="Error" />
                <Menu.Item  >
                    <Button as={NavLink} to={'/createActivity'} positive content="Create Activity" />
                </Menu.Item>
                <Menu.Item position="right">
                    <Image src={user?.image || '/asserts/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <DropdownMenu>
                            <DropdownItem as={Link} to={`/profile/${user?.userName}`} icon="user" text="My Profile" />
                            <DropdownItem onClick={logout} text="Logout" icon="power" />
                        </DropdownMenu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )

})