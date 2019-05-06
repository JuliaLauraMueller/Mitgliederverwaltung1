import React, { Component } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
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
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import '../../css/TextEditor.css';

// inline toolbar plugin
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

//static toolbar plugin
const staticToolbarPlugin = createToolbarPlugin();
const { StaticToolbar } = staticToolbarPlugin;

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

  render() {
    return (
      <div className={'editor'}>
        <div style={{ padding: '10px', border: '1px solid #ddd' }}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={[inlineToolbarPlugin, staticToolbarPlugin]}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>

        <StaticToolbar>
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
        </StaticToolbar>
      </div>
    );
  }
}

export default TextEditor;
