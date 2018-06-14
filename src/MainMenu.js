import React from 'react';
import {
    Link,
    NavLink,
} from 'react-router-dom';

import {
    Container,
    Menu,
    Button,
    Icon,
    Segment
} from 'semantic-ui-react';

const MainMenu = () => (
    <Segment inverted vertical>
        <Container>
            <Menu
                inverted
                pointing
                secondary
                size='large'
            >
                <Menu.Item as={NavLink} exact to='/' content='Home' />
                <Menu.Item as={Link} to='/donate' position='right'>
                    <Button icon inverted>
                        Donate <Icon name='gift' />
                    </Button>
                </Menu.Item>
            </Menu>
        </Container>
    </Segment >
);

export default MainMenu;