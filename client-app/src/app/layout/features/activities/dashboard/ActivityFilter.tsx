import React from 'react'
import Calendar from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'

export const ActivityFilter = () => (
    <>
        <Menu vertical size='large' style={{ width: '85%', marginTop: 25 }}>
            <Header icon='filter' attached color='teal' content='Filter' />
            <Menu.Item content='All Activity' />
            <Menu.Item content='I am leaving' />
            <Menu.Item content='I am hosting' />
        </Menu>
        <Header />
        <Calendar />
    </>
)
