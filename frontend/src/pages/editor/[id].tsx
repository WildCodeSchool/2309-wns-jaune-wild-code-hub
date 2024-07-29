import EditorPanel from "@/components/Editor/EditorPanel";
import InfosPanel from "@/components/Editor/InfosPanel";
import View from "@/components/Editor/View";
import CustomToast from "@/components/ToastCustom/CustomToast";
import { PROJECT_BY_ID } from "@/requetes/queries/project.queries";
import { LIST_USERS_ACCESSES_PROJECT } from "@/requetes/queries/usersAccessesProjects.queries";
import { FindAllInfoUserAccessesProject, Project, File } from "@/types/graphql";
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
    console.log("cddkdckdc")
    if (window.location.origin !== expectedOrigin) return;
    const iframe = iframeRef.current;
    if (iframe) {
      console.log("iframe")
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
    console.log("totto")
    console.log("data", data)
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
          <InfosPanel 
            project={project}
            setOpenFiles={setOpenFiles}
            setCode={setCode}
            setFile={setFile}
            setProject={setProject}
            setData={setData}
          />
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

export default Editor;
