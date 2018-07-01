import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Container,
    Grid,
    Icon,
    Image,
    Label,
    Segment,
    Table,
    List,
    Accordion,
} from 'semantic-ui-react';

import codemirror from 'codemirror';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/addon/display/placeholder';
import 'codemirror/lib/codemirror.css';

import Highlight from 'react-highlight'

import TurndownService from 'turndown';

import './MarkdownTest.css';
import 'highlight.js/styles/github.css';

import Markdown from 'react-markdown';

import DropZone from 'react-dropzone'

import breaks from 'remark-breaks';
import Sticky from 'react-sticky-box';

const placeholderText = `This editor supports Github Flavored Markdown.  Click the banner above for more details.
    
You can also paste in content and it will attempt to auto-convert.`;

class ImageUploader extends React.Component {
    static propTypes = {
        onThumbnailClick: PropTypes.func,
    }

    constructor(props) {
        super(props)

        this.state = {
            thumbnails: [],
            expanded: false,
        }
    }

    handleDrop = (accepted, rejected) => {
        rejected.forEach(
            file => {
                window.URL.revokeObjectURL(file.preview)
            }
        )

        let thumbnails = []

        accepted.forEach(
            file => {
                thumbnails.push(file)
            }
        )

        this.setState(prev => {
            prev.thumbnails = prev.thumbnails.concat(thumbnails)
            return prev
        })
    }

    render = () => (
        <Accordion as={Segment} >
            <Accordion.Title
                as={Label}
                active={this.state.expanded}
                attached='top'
                content="Image Uploads"
                onClick={() => {
                    this.setState(prev => {
                        prev.expanded = !prev.expanded
                        return prev
                    })
                }} />
            <Accordion.Content as={List} active={this.state.expanded}>

                {
                    this.state.thumbnails.map(
                        (thumbnail, key) => (
                            <List.Item key={key}>
                                <Image key={key} src={thumbnail.preview} bordered as='a'
                                    onClick={() => {
                                        if (this.props.onThumbnailClick) {
                                            this.props.onThumbnailClick(this.state.thumbnails[key])
                                        }
                                    }} />
                            </List.Item>
                        )
                    )
                }

                <List.Item>
                    <DropZone style={{
                        borderWidth: '2px',
                        borderColor: 'rgb(102, 102, 102)',
                        borderStyle: 'dashed',
                        borderRadius: '5px',
                    }} accept='image/*' onDrop={this.handleDrop}>
                        <Container textAlign='center' style={{ fontSize: '1.2em' }}>
                            <Icon name='picture' size='massive' disabled />
                            <p> Click or Drag Image Here to Upload </p>
                        </Container>
                    </DropZone>
                </List.Item>
            </Accordion.Content>
        </Accordion>
    )
}

class MarkdownEditor extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
        onChange: PropTypes.func,
    }

    constructor(props) {
        super(props)

        this.state = {
            pasted: null,
        }

        this.htmlToMarkdown = new TurndownService();
        this.htmlToMarkdown.remove('style')
    }

    updatePaste = (content) => {
        this.setState((prev) => {
            prev.pasted = content
            return prev
        })
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
            placeholder: placeholderText,
        });

        this.editor.on('change', this.props.onChange);
        this.editor.on('beforeChange', (e, change) => {
            if (change.origin === "paste") {
                if (this.state.pasted !== null) {
                    change.cancel()
                    e.doc.replaceRange(this.state.pasted, change.from, change.to)
                    this.setState({ pasted: null });
                }
            }
        });

        this.editor.on('paste', (cm, e) => {
            let html = e.clipboardData.getData('text/html');

            if (html === "") {
                this.setState({ pasted: null });
            } else {
                this.setState({ pasted: this.htmlToMarkdown.turndown(html).trim() });
            }
        });
    }

    Toolbar = () => {
        const replace = (before = "", after = "", split = false) => {
            let sel = this.editor.getSelection()
            if (sel === "") {
                let cursor = this.editor.getCursor()

                if (split && cursor["ch"] !== 0) {
                    this.editor.replaceSelection("\n" + before + after)
                    cursor["line"] += 1
                    cursor["ch"] = before.length
                } else {
                    this.editor.replaceSelection(before + after)
                    cursor["ch"] += before.length
                }

                this.editor.focus()
                this.editor.setCursor(cursor)
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

            let cursor = this.editor.getCursor("start")

            // Numbered lists require multiple line breaks to seperate
            if (cursor["line"] !== 0 || cursor["ch"] !== 0) {
                this.editor.replaceSelection("\n\n")
                cursor["line"] += 2
                cursor["ch"] = 0
            }

            if (sel === "") {
                return replace("1. ", "\n")
            }

            let items = sel.split('\n')

            var text = ""

            for (var i = 1; i <= items.length; i++) {
                text += i + ". " + items[i - 1] + '\n'
            }

            this.editor.replaceSelection(text + '\n')
        }

        return (
            <Segment vertical basic textAlign='center' style={{ padding: '5px 0 0 0' }}>
                <Button.Group icon size='mini' compact basic>
                    <Button icon='bold' onClick={() => replace("**", "**")} />
                    <Button icon='italic' onClick={() => replace("*", "*")} />
                    <Button icon='strikethrough' onClick={() => replace("~~", "~~")} />
                    <Button icon='quote left' onClick={() => replace("> ", "", true)} />
                    <Button icon='code' onClick={() => replace("```\n", "\n```")} />
                    <Button icon='linkify' onClick={() => replace("[", "](https://url)")} />
                    <Button icon='list ol' onClick={replaceNumList} />
                    <Button icon='list ul' onClick={() => replace("* ", "", true)} />
                    <Button icon='heading' onClick={() => replace("# ", "", true)} />
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
            <ImageUploader onThumbnailClick={thumbnail => {
                this.editor.replaceSelection("![" + thumbnail.name + "](" + thumbnail.preview + ")")
            }} />
        </div>
    )
}

class MarkdownTest extends React.Component {
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
        code: (props) => <Highlight className={props.language}>{props.value}</Highlight>,
    }

    // debounce the updates to every 200ms
    shouldComponentUpdate = () => {
        if (this.timeout) {
            clearTimeout(this.timeout)
        }

        this.timeout = setTimeout(() => this.forceUpdate(), 200)
        return false
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