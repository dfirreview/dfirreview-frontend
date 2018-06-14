import React from 'react';
import { render } from 'react-snapshot';

import 'semantic-ui-css/semantic.min.css';

import Donate from './Donate.js'
import Home from './Home.js';
import MainMenu from './MainMenu.js';
import Footer from './Footer.js'

import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import {
    Container,
    Header,
    Icon,
    Message,
    Segment,
} from 'semantic-ui-react';

const NotFound = () => (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', }}>
        <MainMenu />
        <Segment padded='very' vertical inverted textAlign='center'>
            <Icon name='exclamation triangle' size='huge' color='yellow' />
            <Header inverted>Oops! Something went wrong!</Header>
        </Segment>
        <Segment padded='very' vertical textAlign='center' style={{ flex: 1 }}>
            <Container text>
                <Message
                    icon='sitemap'
                    header='404 page not found'
                    content='We are sorry but the page you are looking for does not exist.'
                    color='red'
                    size='huge'
                />
            </Container>
        </Segment>
        <Footer />
    </div>
);

render(
    (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/donate" component={Donate} />
                <Route component={NotFound} status={404} />
            </Switch>
        </Router>
    ), document.getElementById('root')
);

