import React from 'react';

import {
    Button,
    Container,
    Form,
    Header,
    Icon,
    Segment,
} from 'semantic-ui-react';

import S from './common.js';

import { HashLink } from 'react-router-hash-link';

class Apply extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
        }
    }

    render = () => (
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
            <Segment vertical attached padded>
                <Container text>
                    <Form
                        id='application'
                        method='POST'
                        action='https://docs.google.com/forms/d/e/1FAIpQLSdH-2lFJHQazIaamfid6sk6xH9XmnuHE8aLGI6pNJmsAFdKxw/formResponse?embedded=true'
                    >
                        <Form.Input type="hidden" name='entry.1154486043' value={this.state.title} />
                        <Form.Select placeholder='Title' label='Title' options={[
                            { value: '', text: '' },
                            { value: 'Dr.', text: 'Dr.' },
                            { value: 'Mr.', text: 'Mr.' },
                            { value: 'Mrs.', text: 'Mrs.' },
                            { value: 'Ms.', text: 'Ms.' },
                            { value: 'Mx.', text: 'Mx.' },
                            { value: 'Prof.', text: 'Prof.' },
                        ]} onChange={(e, { value }) => {
                            this.setState({ title: value })
                        }} />
                        <Form.Input
                            name='entry.668498450'
                            label='First Name'
                            placeholder='First Name'
                            required
                        />
                        <Form.Input
                            name='entry.1967997234'
                            label='Last Name'
                            placeholder='Last Name'
                            required
                        />
                        <Form.Input
                            type='email'
                            name='emailAddress'
                            label='Email Address'
                            placeholder='Email Address'
                            required
                        />
                        <Form.Input
                            name='entry.1292862019'
                            label='Orginization'
                            placeholder='Orginization'
                        />
                        <Form.TextArea
                            name='entry.1393849953'
                            label='Short Biography'
                            placeholder='A bit about yourself and your credentials...'
                            required
                        />
                        <Form.Checkbox
                            label='I am willing to help beta test'
                            name='entry.759727090'
                            value='I would be interested in helping beta test DFIR Review'
                        />
                        <Button type='submit' content='Submit' />
                    </Form>
                </Container>
            </Segment >
        </div>
    )
}

export default Apply