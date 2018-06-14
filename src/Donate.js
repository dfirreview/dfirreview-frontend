import React from 'react';

import S from './common.js'
import config from './config.js'

import { HashLink } from 'react-router-hash-link'

import {
    Button,
    Container,
    Header,
    Icon,
    Message,
    Segment,
} from 'semantic-ui-react';

const Donate = () => (
    <div>
        <Segment vertical inverted padded='very'>
            <Container text textAlign='justified' style={{ hyphens: 'none', fontSize: '1.5em' }}>
                <Header size='large' inverted textAlign='center' content='Thank you for considering a donation to DFIR Review!' />
                <p>
                    <S>This experiment relies on the altruism of the community.</S> <S> Donations like yours will not only fund operating costs, but will be used to reward peer researchers and reviewers who participate in the project.</S>
                </p>
                <center>
                    <Button as={HashLink} to="#options" smooth icon primary size='big'>
                        Donation Options  <Icon name='down arrow' />
                    </Button>
                </center>
            </Container>
        </Segment>

        <Segment vertical id='options' style={{ flex: 1 }}>
            <Container textAlign='center'>
                <Segment.Group compact id='options'>
                    <Header as='h2' attached='top' block content='Donation Options' />
                    <Message attached icon='warning circle' info content='Credit/Debit and Banking options are coming soon!' />


                    <Segment attached>
                        <Button icon
                            as='a'
                            href={config.COINBASE_COMMERCE_URL}
                            size='massive'
                            labelPosition='left'
                            primary
                            fluid
                        >
                            Crypto Currency  <Icon name='bitcoin' />
                        </Button>
                    </Segment>
                    <Segment attached>
                        <Button icon
                            as='a'
                            size='massive'
                            labelPosition='left'
                            primary
                            disabled
                            fluid
                        >
                            Credit/Debit Card  <Icon name='credit card' />
                        </Button>
                    </Segment>
                    <Segment attached>
                        <Button icon
                            as='a'
                            size='massive'
                            labelPosition='left'
                            primary
                            fluid
                            disabled
                        >
                            Bank Account  <Icon name='university' />
                        </Button>
                    </Segment>
                </Segment.Group>
            </Container>
        </Segment>
    </div >
)

export default Donate;