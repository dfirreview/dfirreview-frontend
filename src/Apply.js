import React from 'react';
import S from './common.js'
import { HashLink } from 'react-router-hash-link'
import {
    Button,
    Container,
    Header,
    Icon,
    Segment,
} from 'semantic-ui-react';


const Apply = () => (
    <div>
        <Segment vertical inverted padded='very'>
            <Container text textAlign='justified' style={{ hyphens: 'none', fontSize: '1.5em' }}>
                <Header size='large' inverted textAlign='center' content='Thank you for your interest in becoming a reviewer!' />
                <p>
                    <S>This experiment will not be possible without quality community reviewers.</S>
                </p>
                <center>
                    <Button as={HashLink} to="#application" icon primary size='big'>
                        Apply Now <Icon name='down arrow' />
                    </Button>
                </center>
            </Container>
        </Segment>
        <Segment id="application" attached>
            <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSdH-2lFJHQazIaamfid6sk6xH9XmnuHE8aLGI6pNJmsAFdKxw/viewform?embedded=true"
                width="100%"
                height="1500px"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                scrolling="auto"
                title="reviewer application"
            />
        </Segment>
    </div>
)

export default Apply;