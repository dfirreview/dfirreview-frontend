import React from 'react';
import { HashLink } from 'react-router-hash-link';
import S from './common.js';

import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';

import MainMenu from './MainMenu.js';
import Footer from './Footer.js';

const HomeHeader = () => (
  <div>
    <MainMenu />

    <Segment padded='very' inverted vertical textAlign='center'>
      <Container text>

        <Header size='huge' inverted content='DFIR Review' />

        <Header size='large' inverted content='Peer Reviewed Community-Driven Research' />

        <p style={{ fontSize: '1.25em' }}>
          DFIR Review is an experimental platform that is intended to help promote repeatable and verifyable Digital Forensics and Incident Response research.
        </p>

        <Button as={HashLink} to="#content" icon primary size='big'>
          Learn More  <Icon name='down arrow' />
        </Button>

      </Container>
    </Segment>

  </div >
);

const Home = () => (
  <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', }}>
    <HomeHeader />

    <Segment vertical style={{ fontSize: '1.5em', flex: 1 }}>
      <Container textAlign='justified' style={{ hyphens: 'none' }}>
        <Grid doubling columns={2} celled='internally' relaxed>
          <Grid.Row id='content'>
            <Grid.Column>
              <Header size='large' textAlign='center' content="The Problem" />
              <p>
                <S>In order to advance the fields of digital forensics and incident response (DFIR), research must be peer reviewed in order to validate the efficacy of findings and novel methodologies.</S> <S>This process is essential to ensure that practitioners are using sound techniques and drawing accurate conclusions in their analysis.</S> <S>Traditionally, this peer review process has been limited to the realm of academic publications and conferences.</S>
              </p>
              <p>
                <S>Due to historically slow review times and the (perceived or real) barrier of entry to academic publishing, more often than not, information about new artifacts and techniques is shared via blog posts.</S> <S>While these posts are invaluable and often provide great insight, the research generally has not been reviewed or the experiments verified by others.</S>
              </p>
            </Grid.Column>
            <Grid.Column>
              <Header size='large' textAlign='center' content="Our Solution" />
              <p>
                <S>DFIR Research is an experimental, community-driven platform for the validation, review, and publication of digital forensics and incident response research.</S> <S>The platform aims to assest researchers in identifying novel contributions to the field that lack sufficient peer review and validation.</S> <S>Researchers are encouraged to validate the work of others by repeating claimed experiments and publishing their findings.</S> <S>Technical and copy editors will review submissions, and accepted work will be published and made freely available.</S>
              </p>
              <p>
                <S>Researchers, reviewers, and editors will be rewarded monetarily from a donation-driven community fund.</S>
              </p>
              <br />
              <center>
                <Button as={HashLink} to='#get-involved' icon size='huge' labelPosition='right'>
                  Get Involved <Icon name='arrow down' />
                </Button>
              </center>

            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={1} id='get-involved'>
            <Grid.Column>
              <Header size='huge' content='Four Ways to Get Involved' textAlign='center' />
              <Grid columns={2} doubling relaxed padded textAlign='center'>
                <Grid.Column>
                  <Header attached='top' block content='Identify' textAlign='center' />
                  <Segment attached style={{ fontSize: '1em' }}>
                    <p>Identify or publish research that is in need of peer review or third-party validation.</p>
                    <center>
                      <Button primary disabled size='big' content='Coming Soon' />
                    </center>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Header attached='top' block content='Validate' textAlign='center' />
                  <Segment attached style={{ fontSize: '1em' }}>
                    <p>Validate research by others and submit your findings for peer review.</p>
                    <center>
                      <Button primary disabled size='big' content='Coming Soon' />
                    </center>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Header attached='top' block content='Review' textAlign='center' />
                  <Segment attached style={{ fontSize: '1em' }}>
                    <p>Sign up to review submissions for technical content and quality.</p>
                    <center>
                      <Button primary disabled size='big' content='Coming Soon' />
                    </center>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Header attached='top' block content='Donate' textAlign='center' />
                  <Segment attached style={{ fontSize: '1em' }}>
                    <p>Contribute to the community fund to help reward researchers and reviewers.</p>
                    <center>
                      <Button primary as='a' href='/donate' size='big' content='Donate' />
                    </center>
                  </Segment>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>

    <Footer />

  </div >
);

export default Home;
