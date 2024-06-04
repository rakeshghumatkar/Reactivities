import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Header, Icon, Search, Segment } from 'semantic-ui-react';

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='search' />
        Oops - We've not found what you are looking for!
      </Header>
      <Segment.Inline>
        <Button as={NavLink} to="/activities">
          Go to the activities
        </Button>
      </Segment.Inline>
    </Segment>
  )
}

export default NotFound;