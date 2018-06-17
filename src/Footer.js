import React from 'react';

import {
    Container,
    Segment,
} from 'semantic-ui-react';

const Footer = () => (
    <Segment padded inverted vertical textAlign='center'>
        <Container>
            <p>© 2018, DFIR Review</p>
            <p>DFIR Review is an independent experiment and is not affiliated with any organization.</p>
        </Container>
    </Segment>
);

export default Footer