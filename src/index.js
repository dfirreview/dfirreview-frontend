import React from 'react';
import { render } from 'react-snapshot';

import 'semantic-ui-css/semantic.min.css';

import Apply from "./Apply.js"
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
    Button,
    Container,
    Header,
    Icon,
    Message,
    Popup,
    Segment,
} from 'semantic-ui-react';

const NotFound = () => (
    <div>
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
    </div>
);

const BugButton = () => (
    <Popup content='Report a Bug' trigger={
        <Button
            as='a'
            href='https://github.com/dfirreview/dfirreview-frontend/issues'
            negative
            icon='bug'
            circular
            style={{
                position: 'fixed',
                right: '10px',
                bottom: '10px',
                zIndex: '1'
            }}
            data-content='Report a Bug'
        />
    } />
);

render(
    <Router>
        <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', }}>
            <BugButton />
            <MainMenu />
            <div id="main-content" style={{ flex: 1 }}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/apply" component={Apply} />
                    <Route exact path="/donate" component={Donate} />
                    <Route component={NotFound} status={404} />
                </Switch>
            </div>
            <Footer />
        </div>
    </Router>
    , document.getElementById('root')
);

