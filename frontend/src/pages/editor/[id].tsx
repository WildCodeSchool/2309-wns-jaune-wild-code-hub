import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, Text, Spacer, Button } from "@chakra-ui/react";
import FileEditor from "../../components/Editor/FileEditor";
import FileInfo from "../../components/Editor/FileInfo";
import BashOutput from "../../components/Editor/BashOutput";
import { NextPageWithLayout } from "../_app";
import components from "@/styles/theme/components";
import FilesList from "../../components/Editor/FilesList";
import AddFileForm from "../../components/Editor/AddFileForm";
import SidebarLayout from "@/components/SidebarLayout";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { PROJECT_BY_ID } from "@/requetes/queries/project.queries";
import { UPDATE_MULTIPLE_FILES } from "@/requetes/mutations/file.mutations";
import {
    UpdateMultipleFilesMutation,
    UpdateMultipleFilesMutationVariables
} from "@/types/graphql";
import CustomToast from '@/components/ToastCustom/CustomToast';
import { SettingsIcon } from "@chakra-ui/icons";
import GenericModal from "@/components/GenericModal";
import DOMPurify from 'dompurify';
import { File } from "@/types/editor";
import { Project } from "@/types/graphql";


const Editor: NextPageWithLayout = () => {
    const router = useRouter();
    const projectById = useQuery(PROJECT_BY_ID, { variables: { findProjectByIdId: router.query.id } });
    const [code, setCode] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [openFiles, setOpenFiles] = useState<File[]>([]);
    const [project, setProject] = useState<Project | null >(null);
    const [consoleLogs, setConsoleLogs] = useState<any[]>([]);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { showAlert } = CustomToast();

    const [data, setData] = useState<File[]>([]);

    const expectedOrigin = process.env.NEXT_PUBLIC_URL_ORIGIN;


    const getCombinedCode = (): string => {
        const htmlFiles = data?.filter((file) => file.extension === "html");
        const cssFiles = data?.filter((file) => file.extension === "css");
        const jsFiles = data?.filter((file) => file.extension === "js");

        const htmlCode = DOMPurify.sanitize(htmlFiles?.map((file) => file.content).join("\n"));
        const cssCode = DOMPurify.sanitize(cssFiles?.map((file) => file.content).join("\n"));
        const jsCode = jsFiles?.map((file) => DOMPurify.sanitize(file.content)).join("\n");

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

    const [updateMultipleFiles] = useMutation<
        UpdateMultipleFilesMutation,
        UpdateMultipleFilesMutationVariables
    >(UPDATE_MULTIPLE_FILES, {
        onCompleted: (data) => {
            data.updateMultipleFiles.forEach((message) => {
                if (message.success)
                    showAlert('success', `${message.message}`);
                else
                    showAlert('error', `${message.message}`);
            })
        },
        onError(error) {
            console.log("error", error)
            showAlert('error', 'We are sorry, there seems to be an error with the server. Please try again later.');
        }
    });

    const updateFilesListBDD: () => void = async () => {
        if (window.location.origin !== expectedOrigin) return;
        if(!project) {
            showAlert("error", "Please wait while the project loads!");
            return;
        }
        const newData = data.map((item: any) => {
            const { __typename, id, ...rest } = item;
            return { ...rest, id: +id };
        });
        if (data) {
            updateMultipleFiles({
                variables: {
                    data: newData
                },
            });

        }
    }

    const updateIframe: () => void = (): void => {
        if (window.location.origin !== expectedOrigin) return;
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
        const handleConsoleLog = (event: MessageEvent): any[] | undefined => {
            if (event.origin !== expectedOrigin) return;
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

        if (projectById?.error?.message === "Access denied! You need to be authenticated to perform this action!") {
            showAlert('error', projectById?.error?.message);
            router.push('/auth/login')
        } else if (projectById?.error?.message === 'Please note, the project does not exist') {
            showAlert('error', projectById?.error?.message);
            router.push("/");
        } else if (projectById?.error?.message === 'You do not have permission to access this project!') {
            showAlert('error', projectById?.error?.message);
            router.push("/");
        } else if (projectById?.error?.message === 'Failed to fetch') {
            showAlert('error', projectById?.error?.message);
            router.push("/auth/login");
        } else {
            setOpenFiles(projectById?.data?.findProjectById?.files);
            setFile(projectById?.data?.findProjectById.files[0]);
            setData(projectById?.data?.findProjectById.files);
            setProject(projectById?.data?.findProjectById);
        }

    }, [projectById, router?.query?.id, router])


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

    const shareModalOpen: () => void = async () => {
        if (window.location.origin !== expectedOrigin) return;
        if(!project) {
            showAlert("error", "Please wait while the project loads!");
            return;
        }
        setIsShareModalOpen(true);
    };

    const settingProject: () => void = async () => {
        if (window.location.origin !== expectedOrigin) return;
        if(!project) {
            showAlert("error", "Please wait while the project loads!");
            return;
        }
        setIsSettingsModalOpen(true);
    };

    return (
        <Box
            display="flex"
            pt="5rem"
        >

            <div>
                {/* <FilesList data={data} setFile={setFile} /> */}
                {/* <AddFileForm addFile={handleAddFile} /> */}
            </div>
            <Box width="40%">
                <Flex>
                    {
                        openFiles &&
                        openFiles.map((openFile) => (
                            <FileInfo
                                key={openFile.id}
                                fileName={`${openFile.name}.${openFile.extension}`}
                                onClose={() => handleFileClose(openFile.id)}
                                isSelected={openFile.id === file?.id}
                                onClick={() => setFile(openFile)}
                            />
                        ))
                    }
                    <Spacer />
                    <Button type="button" variant="secondary" onClick={updateFilesListBDD}>
                        Save
                    </Button>
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
                <Flex>
                    <Text bg="background2" width="3rem" pl="5px" pb="0.2rem">View</Text>
                    <Spacer />
                    <Button type="button" variant="secondary" onClick={shareModalOpen}>
                        Share
                    </Button>
                    <SettingsIcon boxSize={9} cursor="pointer" onClick={settingProject} />
                </Flex>
                <iframe
                    ref={iframeRef}
                    title="Preview"
                    style={{ width: "100%", height: "100%", border: "1px solid black", backgroundColor: "#151515" }}
                ></iframe>
            </Box>

            <GenericModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
            >
                <Text color="white">Text</Text>

            </GenericModal>

            <GenericModal
                isOpen={isSettingsModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
            >
                <Text color="white">Settings</Text>
            </GenericModal>

        </Box>
    );
};

// V1 Add list info 
// Editor.getLayout = function getLayout(page) {
//     return <SidebarLayout>{page}</SidebarLayout>;
//   };

export default Editor;