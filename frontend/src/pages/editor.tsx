import React, { useState, useEffect, useRef } from "react";
import { Box, Flex } from "@chakra-ui/react";
import components from "@/styles/theme/components";

import FileEditor from "../components/Editor/FileEditor";
import FilesList from "../components/Editor/FilesList";
import AddFileForm from "../components/Editor/AddFileForm";
import FileInfo from "../components/Editor/FileInfo";

interface File {
  id: number;
  name: string;
  extension: string;
  content: string;
  language: string;
}

const Editor: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [openFiles, setOpenFiles] = useState<File[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [data, setData] = useState<File[]>([
    {
      id: 1,
      name: "file 1",
      extension: "html",
      content: `
<div id="app">
    <p class="blue">Hello, world!</p>
</div>
      `,
      language: "html",
    },
    {
      id: 2,
      name: "file 2",
      extension: "css",
      content: `#app { background: red; }`,
      language: "css",
    },
    {
      id: 3,
      name: "file 3",
      extension: "js",
      content: `document.getElementById('app').innerText = "Hello, JavaScript!";`,
      language: "javascript",
    },
    {
      id: 4,
      name: "file 4",
      extension: "css",
      content: `.blue { color: blue; }`,
      language: "css",
    },
  ]);

  const getCombinedCode = (): string => {
    const htmlFiles = data.filter((file) => file.extension === "html");
    const cssFiles = data.filter((file) => file.extension === "css");
    const jsFiles = data.filter((file) => file.extension === "js");

    const htmlCode = htmlFiles.map((file) => file.content).join("\n");
    const cssCode = cssFiles.map((file) => file.content).join("\n");
    const jsCode = jsFiles.map((file) => file.content).join("\n");

    return `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}<\/script>
        </body>
      </html>
    `;
  };

  const updateIframe = (): void => {
    const iframe = iframeRef.current;
    if (iframe) {
      const document = iframe.contentDocument;
      if (document) {
        document.open();
        document.write(getCombinedCode());
        document.close();
      }
    }
  };

  useEffect(() => {
    updateIframe();
  }, [data]);

  useEffect(() => {
    if (file) {
      setCode(file.content);
      setOpenFiles((prevOpenFiles) => {
        if (!prevOpenFiles.find((f) => f.id === file.id)) {
          return [...prevOpenFiles, file];
        }
        return prevOpenFiles;
      });
    }
  }, [file]);

  const handleCodeChange = (newCode: string): void => {
    setCode(newCode);
    setData((prevData) =>
      prevData.map((f) => (f.id === file?.id ? { ...f, content: newCode } : f))
    );
  };

  const handleAddFile = (fileName: string): void => {
    const extension = fileName.split('.').pop() || '';
    const name = fileName.replace(`.${extension}`, '');
    const language = extension === "js" ? "javascript" : extension;

    const newFile: File = {
      id: data.length + 1,
      name,
      extension,
      content: "",
      language,
    };

    setData((prevData) => [...prevData, newFile]);
    setFile(newFile);
  };

  const handleFileClose = (fileId: number): void => {
    setOpenFiles((prevOpenFiles) => {
      const newOpenFiles = prevOpenFiles.filter((f) => f.id !== fileId);
      if (newOpenFiles.length === 0) {
        setFile(null);
        setCode("");
      } else if (file?.id === fileId) {
        setFile(newOpenFiles[0]);
        setCode(newOpenFiles[0].content);
      }
      return newOpenFiles;
    });
  };

  return (
    <Box
      {...components.Box.main}
      bgColor={"background"}
      bgRepeat={"no-repeat"}
      bgImage="url(/BGForm.png)"
    >
      <Flex>
        <div>
          <FilesList data={data} setFile={setFile} />
          <AddFileForm addFile={handleAddFile} />
        </div>
        <div style={{backgroundColor:"#14181F"}}>
          <Flex>
            {openFiles.map((openFile) => (
              <FileInfo
                key={openFile.id}
                fileName={`${openFile.name}.${openFile.extension}`}
                onClose={() => handleFileClose(openFile.id)}
                isSelected={openFile.id === file?.id}
                onClick={() => setFile(openFile)}
              />
            ))}
          </Flex>
          <FileEditor
            code={code}
            setCode={handleCodeChange}
            file={file}
            setData={setData}
            language={file?.language}
          />
        </div>
      </Flex>
      <div>
        <h2>Result:</h2>
        <iframe
          ref={iframeRef}
          title="Preview"
          style={{ width: "100%", height: "500px", border: "1px solid black", backgroundColor: "white" }}
        ></iframe>
      </div>
    </Box>
  );
};

export default Editor;