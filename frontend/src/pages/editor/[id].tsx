import EditorPanel from "@/components/Editor/EditorPanel";
import InfosPanel from "@/components/Editor/InfosPanel";
import View from "@/components/Editor/View";
import CustomToast from "@/components/ToastCustom/CustomToast";
import { PROJECT_BY_ID } from "@/requetes/queries/project.queries";
import { LIST_USERS_ACCESSES_PROJECT } from "@/requetes/queries/usersAccessesProjects.queries";
import { File } from "@/types/editor";
import { FindAllInfoUserAccessesProject, Project } from "@/types/graphql";
import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import DOMPurify from "dompurify";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import Terminal from "../../components/Editor/Terminal";
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

  console.log("users", users);

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
      // setOpenFiles(projectById?.data?.findProjectById?.files);
      // setFile(projectById?.data?.findProjectById.files[0]);
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

  const ref = useRef<ImperativePanelHandle>(null);

  // useEffect(() => {
  //   if (file) {
  //     setCode(file.content);
  //     setOpenFiles((prevOpenFiles) => {
  //       if (!prevOpenFiles.find((f) => f.id === file.id)) {
  //         return [...prevOpenFiles, file];
  //       }
  //       return prevOpenFiles;
  //     });
  //   }
  // }, [file]);

  // const handleCodeChange = (newCode: string): void => {
  //   setCode(newCode);
  //   setData((prevData) =>
  //     prevData.map((f) => (f.id === file?.id ? { ...f, content: newCode } : f))
  //   );
  // };

  // const handleFileClose = (fileId: number): void => {
  //   setOpenFiles((prevOpenFiles) => {
  //     const newOpenFiles = prevOpenFiles.filter((f) => f.id !== fileId);
  //     if (newOpenFiles.length === 0) {
  //       setFile(null);
  //       setCode("");
  //     } else if (file?.id === fileId) {
  //       setFile(newOpenFiles[0]);
  //       setCode(newOpenFiles[0].content);
  //     }
  //     return newOpenFiles;
  //   });
  // };

  // const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
  //   const { deltaY } = event;
  //   if (fileBarRef.current) {
  //     fileBarRef.current.scrollLeft += deltaY;
  //   }
  // };

  return (
    <Flex
      id="editor-page"
      height={"100vh"}
      width={"100vw"}
      p={"0rem 0.5rem 0.5rem 0rem"}
      style={{ contain: "size" }}
      bg={"background"}
      pt={"5rem"}
    >
      <PanelGroup direction="horizontal">
        <Panel minSize={15}>
          <InfosPanel project={project} setOpenFiles={setOpenFiles} />
          {/* <Flex height={"100%"} flexDirection={"column"}>
            <Flex flexDirection={"column"} textAlign={"center"} gap={1}>
              <Heading size={"lg"} textAlign={"center"}>
                Project Name
              </Heading>
              <Text fontSize={"xs"}>by</Text>
              <Heading size={"md"}>{}</Heading>
            </Flex>

            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Infos
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Flex flexDirection={"column"}></Flex>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Files
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Flex flexDirection={"column"}>
                    {project?.files
                      ? project.files.map((file) => (
                          <FileItemList key={file.id} file={file} />
                        ))
                      : "There will be files here in the near futur"}
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex> */}
        </Panel>
        <PanelResizeHandle
          style={{
            width: "0.5px",
            backgroundColor: "#363636",
          }}
        />
        <Panel defaultSize={40} minSize={20}>
          <PanelGroup direction="vertical">
            <Panel collapsible={true}>
              <EditorPanel
                expectedOrigin={expectedOrigin}
                setData={setData}
                project={project}
                listUserAuthorisationSave={listUserAuthorisationSave}
                openFiles={openFiles}
                setOpenFiles={setOpenFiles}
                data={data}
                setCode={setCode}
                code={code}
                setFile={setFile}
                file={file}
              />
              {/* <Flex
                height={"2.5rem"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Flex
                  ref={fileBarRef}
                  height={"100%"}
                  overflowX={"scroll"}
                  overflowY={"hidden"}
                  width={"100%"}
                  sx={{
                    "scrollbar-color": "#8A98A4 #363636",
                    scrollbarWidth: "thin",
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
                </Flex>

                <UpdateListFilesEditor
                  data={data}
                  project={project}
                  expectedOrigin={expectedOrigin}
                  listUserAuthorisationSave={listUserAuthorisationSave}
                />
              </Flex>
              <Flex height={"100%"}>
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
              </Flex> */}
            </Panel>
            <PanelResizeHandle
              style={{
                height: "1px",
                backgroundColor: "#363636",
              }}
            />
            <Panel minSize={7} collapsible ref={ref} collapsedSize={7}>
              <Terminal logs={consoleLogs} panelRef={ref} />
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle
          style={{
            width: "1px",
            backgroundColor: "#363636",
          }}
        />
        <Panel defaultSize={40} minSize={20}>
          <View
            iframeRef={iframeRef}
            project={project}
            checkOwner={checkOwner}
            users={users}
            setUsers={setUsers}
            expectedOrigin={expectedOrigin}
            setProject={setProject}
          />
        </Panel>
      </PanelGroup>
    </Flex>
  );
};

// V1 Add list info
// Editor.getLayout = function getLayout(page) {
//   return <SidebarLayout>{page}</SidebarLayout>;
// };

export default Editor;
