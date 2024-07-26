import { ButtonGroup, Center, Flex } from "@chakra-ui/react";
import React, { SetStateAction } from "react";
import ShareEditor from "./ShareEditor/ShareEditor";
import SettingEditor from "./SettingEditor/SettingEditor";
import { FindAllInfoUserAccessesProject, Project } from "@/types/graphql";
type ViewProps = {
  iframeRef: React.RefObject<HTMLIFrameElement>;
  project: Project | null;
  expectedOrigin: string | undefined;
  users: FindAllInfoUserAccessesProject[] | null;
  setUsers: React.Dispatch<
    React.SetStateAction<FindAllInfoUserAccessesProject[] | null>
  >;
  checkOwner: boolean;
  setProject: React.Dispatch<SetStateAction<Project | null>>;
};

const View = ({
  iframeRef,
  project,
  expectedOrigin,
  users,
  setUsers,
  checkOwner,
  setProject,
}: ViewProps) => {
  return (
    <Flex height={"100%"} overflow={"auto"} flexDirection={"column"}>
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
          <SettingEditor
            project={project}
            expectedOrigin={expectedOrigin}
            checkOwner={checkOwner}
            setProject={setProject}
            users={users}
          />
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
  );
};

export default View;
