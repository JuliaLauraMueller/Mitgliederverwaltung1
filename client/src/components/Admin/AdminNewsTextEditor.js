import React, { Component } from 'react';
import { convertToRaw, EditorState, RichUtils } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
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
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import '../../css/TextEditor.css';

// inline toolbar plugin
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

//Default text
const text = 'Enter text...';

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
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

  //Helper method (blocks)
  getContentStateInJSON = () => {
    const rawJson = convertToRaw(this.state.editorState.getCurrentContent());
    const jsonStr = JSON.stringify(rawJson, null, 1);

    this.setState({ data: jsonStr });
  };

  render() {
    return (
      <div className={'editor'}>
        <div style={{ padding: '10px', border: '1px solid #ddd' }}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={[inlineToolbarPlugin]}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>

        <InlineToolbar>
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
            </div>
          )}
        </InlineToolbar>

        <button
          style={{ marginTop: '30px', marginLeft: '0px' }}
          className={'var'}
          onClick={this.getContentStateInJSON}
        >
          Fetch Content State
        </button>
        <div style={{ background: '#345678', color: '#fff', padding: '20px' }}>
          <pre>{this.state.data}</pre>
        </div>
      </div>
    );
  }
}

export default TextEditor;
