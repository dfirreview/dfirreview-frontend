import React from 'react';

import {
    Container,
    Segment,
} from 'semantic-ui-react';

const Footer = () => (
    <Segment padded inverted vertical textAlign='center'>
        <Container>
            <p>© 2018, DFIR Review</p>
        </Container>
    </Segment>
);

export default Footer