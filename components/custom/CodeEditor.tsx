'use client';

import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, language }) => {
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  const beforeMount = (monaco: any) => {
    monaco.editor.defineTheme('customDark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1a1a1a',
      }
    });
  };

  return (
    <div className="h-full w-full bg-[#1a1a1a]">
      <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        onChange={handleEditorChange}
        theme="customDark"
        beforeMount={beforeMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          tabSize: 2,
          insertSpaces: true,
          cursorStyle: 'line',
          lineHeight: 21,
          folding: true,
          glyphMargin: false,
          renderWhitespace: 'none',
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
          padding: { top: 16, bottom: 16 },
        }}
      />
    </div>
  );
};

export default CodeEditor; 