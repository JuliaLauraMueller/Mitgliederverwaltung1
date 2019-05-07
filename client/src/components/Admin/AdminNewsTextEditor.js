import React, { Component } from 'react';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import createToolbarLinkPlugin from 'draft-js-toolbar-link-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton
} from 'draft-js-buttons';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';

import '../../css/TextEditor.css';

// static toolbar plugin
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;

//link plugin
const toolbarLinkPlugin = createToolbarLinkPlugin();
const { LinkButton } = toolbarLinkPlugin;

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.getRawContent = this.getRawContent.bind(this);
    this.setEditorState = this.setEditorState.bind(this);
    this.onChange = editorState => {
      this.setState({ editorState });
    };
  }

  setEditorState(editorState) {
    if (editorState) {
      this.setState({
        editorState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(editorState))
        )
      });
    }
  }

  getRawContent() {
    let content = this.state.editorState.getCurrentContent();
    if (content.hasText()) {
      return JSON.stringify(convertToRaw(content));
    } else {
      return '';
    }
  }

  //Allowing key commands (Ctrl + b...)
  handleKeyCommand = (command, editorState) => {
    let newState;
    newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'non-handled';
  };

  render() {
    return (
      <div className={'editor'}>
        <div style={{ padding: '10px', border: '1px solid #ddd' }}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={[staticToolbarPlugin, toolbarLinkPlugin]}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
        <Toolbar>
          {externalProps => (
            <div>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <HeadlineOneButton {...externalProps} />
              <HeadlineTwoButton {...externalProps} />
              <HeadlineThreeButton {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
              <LinkButton {...externalProps} />
            </div>
          )}
        </Toolbar>
      </div>
    );
  }
}

export default TextEditor;
