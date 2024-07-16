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
    const [consoleLogs, setConsoleLogs] = useState<any[]>([]);
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
            console.log("toto"); console.log({ a: 1, b: 2 }); console.log([1, 2, 3]);
            console.log("toto", [1, 2, 3]); console.log({ a: 1, b: 2 }, [1, 2, 3]);
            console.log("tototttttttt")
            console.log('arg1',[1,2,30], "arg2" ,{1:"toto",2:"ttt",3:"dddd"})`,
            language: "javascript",
        },
        {
            id: 4,
            name: "file 4",
            extension: "css",
            content: `.blue { color: blue; }`,
            language: "css",
        },
        {
            id: 5,
            name: "file 5",
            extension: "css",
            content: `.blue { color: blue; }`,
            language: "css",
        },
        {
            id: 6,
            name: "file 6",
            extension: "css",
            content: `.blue { color: blue; }`,
            language: "css",
        },
        {
            id: 7,
            name: "file 7",
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
                    window.parent.postMessage({ type: 'console-log', message: logMessage, rawArgs: args }, '*');
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
                    const logMessage = event.data.message;
                    const existingLogIndex = newLogs.findIndex(log => log.message === logMessage);
                    
                    if (existingLogIndex === -1) {
                        newLogs.push({ message: logMessage, rawArgs: event.data.rawArgs });
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
            display="flex"
            pt="5rem"
        >

                <div>
                    <FilesList data={data} setFile={setFile} />
                    {/* <AddFileForm addFile={handleAddFile} /> */}
                </div>
            <Box width="40%">
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
                    <Box p={4} width="100%" height="50%" bg="background2">
                        <Text color="white" textAlign="center">
                            Select a file to edit its content.
                        </Text>
                    </Box>
                )}
                <Box height="50%">
                    <Text bg="background2" width="3rem" pl="5px" pb="0.2rem" >Bash</Text>
                    <BashOutput logs={consoleLogs} />
                </Box>
            </Box>
            <Box width="40%">
                <Text bg="background2" width="3rem" pl="5px" pb="0.2rem">View</Text>
                <iframe
                    ref={iframeRef}
                    title="Preview"
                    style={{ width: "100%", height: "100%", border: "1px solid black", backgroundColor: "#151515" }}
                ></iframe>
            </Box>
        </Box>
    );
};

export default Editor;