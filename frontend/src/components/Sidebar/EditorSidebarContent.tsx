import {
  File,
  Project,
  useFindProjectByIdQuery,
  useFindProjectOwnerLazyQuery,
  useFindProjectOwnerQuery,
} from "@/types/graphql";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import FileItemList from "../Editor/FileItemList";

const EditorSidebarContent = () => {
  const [files, setFiles] = useState<Array<File> | null>(null);
  const [projectOwner, setProjectOwner] = useState<string | null>(null);
  const [project, setProject] = useState<Omit<Project, "files">>();

  const params = useParams();
  const [getOwner] = useFindProjectOwnerLazyQuery();
  const { data, loading, error } = useFindProjectByIdQuery({
    variables: {
      findProjectByIdId: params.id as string,
    },
    onCompleted(data) {
      setFiles(data.findProjectById.files);
      setProject(data.findProjectById);
      getOwner({
        variables: {
          projectId: params.id as string,
        },
        onCompleted(data) {
          setProjectOwner(data.findProjectOwner.pseudo);
        },
      });
    },
  });
  console.log("project", project);
  return (
    <Flex id="top-nav" width={"100%"} direction={"column"} gap={12}></Flex>
  );
};

export default EditorSidebarContent;
