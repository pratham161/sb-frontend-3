import React, { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import 'jodit/es2021/jodit.min.css';

interface JoditEditorWrapperProps {
  value: string;
  onChange: (content: string) => void;
}

const JoditEditorWrapper: React.FC<JoditEditorWrapperProps> = ({ value, onChange }) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Start writing your article content...',
      theme: 'dark',
      minHeight: 500,
      toolbarSticky: false,
      spellcheck: true,
      buttons: [
        'source',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'ul',
        'ol',
        '|',
        'outdent',
        'indent',
        '|',
        'font',
        'fontsize',
        'brush',
        'paragraph',
        '|',
        'image',
        'video',
        'table',
        'link',
        '|',
        'align',
        '|',
        'undo',
        'redo',
        '|',
        'hr',
        'eraser',
        'copyformat',
        '|',
        'symbol',
        'fullsize',
        'print',
      ],
      uploader: {
        insertImageAsBase64URI: true,
      },
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
    }),
    []
  );

  return (
    <div className="jodit-wrapper" style={{ borderRadius: '0.5rem', overflow: 'hidden' }}>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={(newContent) => onChange(newContent)}
        onChange={() => {}}
      />
    </div>
  );
};

export default JoditEditorWrapper;
