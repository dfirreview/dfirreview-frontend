import React from 'react';
import PropTypes from 'prop-types';

import {
    Container,
    Icon,
    Label,
    Segment,
    Tab,
    Table,
} from 'semantic-ui-react';

import codemirror from 'codemirror';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/addon/display/placeholder'
import 'codemirror/lib/codemirror.css';

import './MarkdownTest.css'

import Markdown from 'react-markdown';

class MarkdownEditor extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
        onBlur: PropTypes.func,
    }
    componentDidMount() {
        // code mirror setup
        this.editor = codemirror.fromTextArea(this.refEditor, {
            forceTextArea: true,
            autofocus: true,
            mode: 'gfm',
            lineNumbers: true,
            matchBrackets: true,
            lineWrapping: true,
            tabSize: 2,
            placeholder: "This editor supports Github Flavored Markdown.  Click the banner above for more details.",
        });

        this.editor.on('blur', this.props.onBlur);
    }

    render = () => (
        <div>
            <textarea
                ref={e => this.refEditor = e}
                defaultValue={this.props.content}
            />
        </div>
    )
}

class MarkdownTest extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            markdown: "",
        }
    }


    renderers = {
        root: Container,
        table: (props) => <Table celled>{props.children}</Table>,
    }


    editor = () => (
        <Tab.Pane attached='top'>
            <Container>
                <Label
                    as='a'
                    href='https://guides.github.com/features/mastering-markdown/'
                    target='_blank'
                    attached='top'
                >
                    <Icon name='code' /> Markdown
                </Label>
                <MarkdownEditor content={this.state.markdown} onBlur={
                    (e) => {
                        this.setState({ markdown: e.getValue() })
                    }
                } />
            </Container>
        </Tab.Pane>
    )

    preview = () => (
        <Tab.Pane attached='top'>
            <Label attached='top'><Icon name='file alternate' />Preview</Label>
            <Markdown source={this.state.markdown} renderers={this.renderers} />
        </Tab.Pane>
    )

    render = () => (
        <Segment vertical attached>
            <Container>
                <Tab panes={[
                    { menuItem: 'Edit', render: this.editor },
                    { menuItem: 'Preview', render: this.preview },
                ]}
                    menu={{ attached: 'bottom' }}
                />
            </Container>
        </Segment>
    )
}

export default MarkdownTest;