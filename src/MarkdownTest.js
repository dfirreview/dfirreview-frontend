import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Grid,
    Icon,
    Image,
    Label,
    Segment,
    Table,
} from 'semantic-ui-react';

import codemirror from 'codemirror';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/addon/display/placeholder';
import 'codemirror/lib/codemirror.css';

import TurndownService from 'turndown';

import './MarkdownTest.css';

import Markdown from 'react-markdown';

import breaks from 'remark-breaks';
import Sticky from 'react-sticky-box';

const placeholderText = `This editor supports Github Flavored Markdown.  Click the banner above for more details.
    
You can also paste in content and it will attempt to auto-convert.

Known Issues:
    - Pasted website content that contains links might mess up spacing around the links.
    - Documents pasted from Word might contain a weirdly escaped HTML comment at the top.
`;

class MarkdownEditor extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
        onChange: PropTypes.func,
    }

    htmlToMarkdown = new TurndownService();

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
            placeholder: placeholderText,
        });

        this.editor.on('change', this.props.onChange);
        this.editor.on('beforeChange', (e, change) => {
            if (change.origin === "paste") {
                if (this.state.pasted !== null) {
                    change.cancel()
                    e.doc.replaceRange(this.state.pasted, change.from, change.to)
                    this.setState({ pasted: null })
                }
            }
        });

        this.editor.on('paste', (cm, e) => {
            let html = e.clipboardData.getData('text/html');

            if (html === "") {
                this.setState({ pasted: null });
            } else {
                this.setState({ pasted: this.htmlToMarkdown.turndown(html) });
            }
        });
    }

    Toolbar = () => {
        const replace = (before, after = "", split = false) => {
            let sel = this.editor.getSelection()
            if (sel === "") {
                return
            }

            if (split) {
                let text = ""

                sel.split('\n').forEach(line => text += before + line + after + "\n")
                text = text.slice(0, -1)

                this.editor.replaceSelection(text)
            } else {
                this.editor.replaceSelection(before + sel + after)
            }
        }

        const replaceNumList = () => {
            let sel = this.editor.getSelection()
            if (sel === "") {
                return
            }

            let items = sel.split('\n')

            var text = ""

            for (var i = 1; i <= items.length; i++) {
                text += i + ". " + items[i - 1] + '\n'
            }

            text = text.slice(0, -1)
            this.editor.replaceSelection(text)
        }

        return (
            <Segment vertical basic textAlign='center' style={{ padding: '5px 0 0 0' }}>
                <Button.Group icon size='mini' compact basic>
                    <Button icon='bold' onClick={() => replace("**", "**")} />
                    <Button icon='italic' onClick={() => replace("_", "_")} />
                    <Button icon='strikethrough' onClick={() => replace("~~", "~~")} />
                    <Button icon='quote left' onClick={() => replace("> ", "", true)} />
                    <Button icon='code' onClick={() => replace("```\n", "\n```")} />
                    <Button icon='linkify' onClick={() => replace("[", "]()")} />
                    <Button icon='list ol' onClick={replaceNumList} />
                    <Button icon='list ul' onClick={() => replace("* ", "", true)} />
                    <Button icon='heading' onClick={() => replace("# ")} />
                </Button.Group>
            </Segment>
        )
    }

    render = () => (
        <div>
            <textarea
                ref={e => this.refEditor = e}
                defaultValue={this.props.content}
            />
            <this.Toolbar />
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
        root: (props) => (
            <Segment
                vertical
                style={{ textAlign: 'justify', hyphens: 'manual' }}
            >
                {props.children}
            </Segment>
        ),
        table: (props) => <Table celled>{props.children}</Table>,
        image: (props) => <Image as='a' href={props.src} src={props.src} target='_blank' />,
    }


    editor = () => (
        <Sticky>
            <Segment>
                <Label
                    as='a'
                    href='https://guides.github.com/features/mastering-markdown/'
                    target='_blank'
                    attached='top'
                >
                    <Icon name='code' /> Markdown
                </Label>
                <MarkdownEditor content={this.state.markdown} onChange={
                    (e) => {
                        this.setState({ markdown: e.getValue() })
                    }
                } />
            </Segment>
        </Sticky>

    )

    preview = () => (
        <Segment>
            <Label attached='top'><Icon name='file alternate' />Preview</Label>
            <Markdown source={this.state.markdown} renderers={this.renderers} plugins={[breaks]} />
        </Segment>
    )

    render = () => (
        <Segment vertical attached>
            <Grid padded doubling columns={2}>
                <Grid.Column ><this.editor /></Grid.Column>
                <Grid.Column><this.preview /></Grid.Column>
            </Grid>
        </Segment>
    )
}

export default MarkdownTest;