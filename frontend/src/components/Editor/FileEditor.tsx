import React, { useEffect, useRef } from "react";
import MonacoEditor, { OnChange } from "@monaco-editor/react";
import { editor } from "monaco-editor";

interface File {
  id: number;
  name: string;
  extension: string;
  content: string;
  language: string;
}

interface Props {
  code: string;
  setCode: (newCode: string) => void;
  file: File | null;
  setData: React.Dispatch<React.SetStateAction<File[]>>;
  language: string | undefined;
}

const FileEditor: React.FC<Props> = ({ code, setCode, file, setData, language }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleChange: OnChange = (value) => {
    if (value && file) {
      setCode(value);
      setData((prevData) =>
        prevData.map((item) => (item.id === file.id ? { ...item, content: value } : item))
      );
    }
  };

  const defaultTheme = (monaco: any) => {
    monaco.editor.defineTheme("theme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#151515",
      },
    });
  };

  const handleEditorDidMount = (editor: any, monaco: any) => { //A ne pas delete editor !
    if (!monaco) return;
    defaultTheme(monaco);
    monaco.editor.setTheme("theme");
  };

  useEffect(() => {
    const resizeEditor = () => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    };
    resizeEditor();
    window.addEventListener("resize", resizeEditor);
    return () => {
      window.removeEventListener("resize", resizeEditor);
    };
  }, []);

  return (
    <MonacoEditor
      width="80vh"
      height="50vh"
      language={language || "javascript"}
      value={code}
      onChange={handleChange}
      onMount={handleEditorDidMount}
      options={{ minimap: { enabled: false } }}
    />
  );
};

export default FileEditor;
