import SettingEditor from "@/components/Editor/SettingEditor";
import ShareEditor from "@/components/Editor/ShareEditor/ShareEditor";
import UpdateListFilesEditor from "@/components/Editor/UpdateListFilesEditor";
import SidebarLayout from "@/components/Sidebar/SidebarLayout";
import CustomToast from "@/components/ToastCustom/CustomToast";
import { PROJECT_BY_ID } from "@/requetes/queries/project.queries";
import { LIST_USERS_ACCESSES_PROJECT } from "@/requetes/queries/usersAccessesProjects.queries";
import { File } from "@/types/editor";
import { FindAllInfoUserAccessesProject, Project } from "@/types/graphql";
import { useQuery } from "@apollo/client";
import { Box, ButtonGroup, Center, Flex, Text } from "@chakra-ui/react";
import DOMPurify from "dompurify";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import BashOutput from "../../components/Editor/BashOutput";
import FileEditor from "../../components/Editor/FileEditor";
import FileInfo from "../../components/Editor/FileInfo";
import { NextPageWithLayout } from "../_app";

const Editor: NextPageWithLayout = () => {
  const expectedOrigin = process.env.NEXT_PUBLIC_URL_ORIGIN;

  const router = useRouter();
  const { showAlert } = CustomToast();

  const projectById = useQuery(PROJECT_BY_ID, {
    variables: { findProjectByIdId: router.query.id },
  });
  const userData = useQuery(LIST_USERS_ACCESSES_PROJECT, {
    variables: { projectId: router.query.id ? +router.query.id : null },
  });
  const fileBarRef = useRef<HTMLDivElement | null>(null);
  const [code, setCode] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [openFiles, setOpenFiles] = useState<File[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<any[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [data, setData] = useState<File[]>([]);
  const [users, setUsers] = useState<FindAllInfoUserAccessesProject[] | null>(
    null
  );
  const [checkOwner, setCheckOwner] = useState<boolean>(false);
  const [listUserAuthorisationSave, setListUserAuthorisationSave] = useState<
    FindAllInfoUserAccessesProject[] | null
  >(null);

  const getCombinedCode = (): string => {
    const htmlFiles = data?.filter((file) => file.extension === "html");
    const cssFiles = data?.filter((file) => file.extension === "css");
    const jsFiles = data?.filter((file) => file.extension === "js");

    const htmlCode = DOMPurify.sanitize(
      htmlFiles?.map((file) => file.content).join("\n")
    );
    const cssCode = DOMPurify.sanitize(
      cssFiles?.map((file) => file.content).join("\n")
    );
    const jsCode = jsFiles
      ?.map((file) => DOMPurify.sanitize(file.content))
      .join("\n");

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
      if (event.data.type === "console-log") {
        setConsoleLogs((prevLogs) => {
          const newLogs = [...prevLogs];
          const logMessage = event.data.message;
          const existingLogIndex = newLogs.findIndex(
            (log) => log.message === logMessage
          );

          if (existingLogIndex === -1) {
            newLogs.push({ message: logMessage, rawArgs: event.data.rawArgs });
          }
          return newLogs;
        });
      }
    };

    window.addEventListener("message", handleConsoleLog);

    return () => {
      window.removeEventListener("message", handleConsoleLog);
    };
  }, [expectedOrigin]);

  useEffect(() => {
    updateIframe();
  }, [data]);

  useEffect(() => {
    if (
      projectById?.error?.message ===
      "Access denied! You need to be authenticated to perform this action!"
    ) {
      showAlert("error", projectById?.error?.message);
      router.push("/auth/login");
    } else if (
      projectById?.error?.message === "Please note, the project does not exist"
    ) {
      showAlert("error", projectById?.error?.message);
      router.push("/");
    } else if (
      projectById?.error?.message ===
      "You do not have permission to access this project!"
    ) {
      showAlert("error", projectById?.error?.message);
      router.push("/");
    } else if (projectById?.error?.message === "Failed to fetch") {
      showAlert("error", projectById?.error?.message);
      router.push("/auth/login");
    } else {
      setOpenFiles(projectById?.data?.findProjectById?.files);
      setFile(projectById?.data?.findProjectById.files[0]);
      setData(projectById?.data?.findProjectById.files);
      setProject(projectById?.data?.findProjectById);
    }
  }, [projectById, router]);

  useEffect(() => {
    if (userData?.data?.listUsersAccessesProject) {
      setUsers(userData?.data?.listUsersAccessesProject);
      const listUserData = userData?.data?.listUsersAccessesProject;
      const checkOwnerProject = listUserData.find(
        (user: FindAllInfoUserAccessesProject) => user.role === "OWNER"
      );
      const getCookieIdUser = Cookies.get("id");
      const searchListUserEditor = listUserData.filter(
        (user: FindAllInfoUserAccessesProject) =>
          user.role === "EDITOR" || user.role === "OWNER"
      );
      setListUserAuthorisationSave(searchListUserEditor);
      if (getCookieIdUser == checkOwnerProject?.user_id) setCheckOwner(true);
      else setCheckOwner(false);
    }
  }, [userData, router]);

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

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const { deltaY } = event;
    if (fileBarRef.current) {
      fileBarRef.current.scrollLeft += deltaY;
    }
  };

  return (
    <Flex
      height={"calc(100vh - 5rem)"}
      width={"100vw"}
      p={"0rem 0.5rem 0.5rem 1.5rem"}
      style={{ contain: "size" }}
      bg={"background"}
    >
      <Flex flex={1} height={"100%"} flexDirection={"column"} overflow={"auto"}>
        <Flex
          height={"2.5rem"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Flex
            ref={fileBarRef}
            height={"100%"}
            overflow={"scroll"}
            width={"100%"}
            style={{
              scrollbarColor: "red",
            }}
            onWheel={handleScroll}
          >
            {openFiles &&
              openFiles.map((openFile) => (
                <FileInfo
                  key={openFile.id}
                  fileName={`${openFile.name}.${openFile.extension}`}
                  onClose={() => handleFileClose(openFile.id)}
                  isSelected={openFile.id === file?.id}
                  onClick={() => setFile(openFile)}
                />
              ))}
            {openFiles &&
              openFiles.map((openFile) => (
                <FileInfo
                  key={openFile.id}
                  fileName={`${openFile.name}.${openFile.extension}`}
                  onClose={() => handleFileClose(openFile.id)}
                  isSelected={openFile.id === file?.id}
                  onClick={() => setFile(openFile)}
                />
              ))}
            {openFiles &&
              openFiles.map((openFile) => (
                <FileInfo
                  key={openFile.id}
                  fileName={`${openFile.name}.${openFile.extension}`}
                  onClose={() => handleFileClose(openFile.id)}
                  isSelected={openFile.id === file?.id}
                  onClick={() => setFile(openFile)}
                />
              ))}
            {openFiles &&
              openFiles.map((openFile) => (
                <FileInfo
                  key={openFile.id}
                  fileName={`${openFile.name}.${openFile.extension}`}
                  onClose={() => handleFileClose(openFile.id)}
                  isSelected={openFile.id === file?.id}
                  onClick={() => setFile(openFile)}
                />
              ))}
          </Flex>

          <UpdateListFilesEditor
            data={data}
            project={project}
            expectedOrigin={expectedOrigin}
            listUserAuthorisationSave={listUserAuthorisationSave}
          />
        </Flex>

        <Flex height={"50%"}>
          {file ? (
            <FileEditor
              code={code}
              setCode={handleCodeChange}
              file={file}
              setData={setData}
              language={file.language}
            />
          ) : (
            <Box p={4} width="100%" bg="background2">
              <Text color="white" textAlign="center">
                Select a file to edit its content.
              </Text>
            </Box>
          )}
        </Flex>
        <Flex height={"50%"} paddingTop={"0.2rem"}>
          <Box height={"100%"} width={"100%"} style={{ containerType: "size" }}>
            <Center height={"2.5rem"} bg="background2" width={"4rem"}>
              Bash
            </Center>
            <BashOutput logs={consoleLogs} />
          </Box>
        </Flex>
      </Flex>
      <Flex flex={1} height={"100%"} overflow={"auto"} flexDirection={"column"}>
        <Flex height={"2.5rem"} justifyContent={"space-between"}>
          <Center bg="grey" paddingInline={2}>
            View
          </Center>
          <ButtonGroup
            alignItems={"center"}
            paddingLeft={6}
            spacing={4}
            paddingRight={2}
          >
            <ShareEditor
              project={project}
              expectedOrigin={expectedOrigin}
              users={users}
              setUsers={setUsers}
              checkOwner={checkOwner}
            />
            <SettingEditor project={project} expectedOrigin={expectedOrigin} />
          </ButtonGroup>
        </Flex>
        <iframe
          ref={iframeRef}
          title="Preview"
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid black",
            backgroundColor: "#151515",
          }}
        ></iframe>
      </Flex>
    </Flex>
  );
};

// V1 Add list info
Editor.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default Editor;
