import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import components from "@/styles/theme/components";

import FileEditor from "../components/Editor/FileEditor";
import FilesList from "../components/Editor/FilesList";
import AddFileForm from "../components/Editor/AddFileForm";
import FileInfo from "../components/Editor/FileInfo";
import BashOutput from "../components/Editor/BashOutput";

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
    const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
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
            content: `document.getElementById('app').innerText = "Hello, JavaScript!";
                    console.log("toto")`,
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
              <script>
                (function() {
                  const originalLog = console.log;
                  console.log = function(...args) {
                    const logMessage = args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' ');
                    originalLog.apply(console, args);
                    window.parent.postMessage({ type: 'console-log', message: logMessage }, '*');
                  };
                  ${jsCode}
                })();
              </script>
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
        const handleConsoleLog = (event: MessageEvent) => {
            if (event.data.type === 'console-log') {
                setConsoleLogs((prevLogs) => {
                    const newLogs = [...prevLogs];
                    if (!newLogs.includes(event.data.message)) {
                        newLogs.push(event.data.message);
                    }
                    return newLogs;
                });
            }
        };

        window.addEventListener('message', handleConsoleLog);

        return () => {
            window.removeEventListener('message', handleConsoleLog);
        };
    }, []);

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
            {...components.Box.editor}
            bgColor={"background"}
            bgRepeat={"no-repeat"}
            bgImage="url(/BGForm.png)"
        >
            <Flex>
                <div>
                    <FilesList data={data} setFile={setFile} />
                    <AddFileForm addFile={handleAddFile} />
                </div>
                <div>
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
                    {file ? (
                        <FileEditor
                            code={code}
                            setCode={handleCodeChange}
                            file={file}
                            setData={setData}
                            language={file.language}
                        />
                    ) : (
                        <Box p={4}width="80vh" height="50vh" bg="gray">
                            <Text color="white" textAlign="center">
                                Sélectionnez un fichier pour éditer son contenu.
                            </Text>
                        </Box>
                    )}
                    <BashOutput logs={consoleLogs} />
                </div>
            </Flex>
            <div>
                <Text bg="gray" width="3rem" p="2px">View</Text>
                <iframe
                    ref={iframeRef}
                    title="Preview"
                    style={{ width: "100%", height: "80vh", border: "1px solid black", backgroundColor: "#151515" }}
                ></iframe>
            </div>
        </Box>
    );
};

export default Editor;