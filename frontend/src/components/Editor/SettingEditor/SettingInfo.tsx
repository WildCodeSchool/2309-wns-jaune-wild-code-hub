import React, { useState, useEffect } from "react";
import { 
  FindAllInfoUserAccessesProject,
  Project,
} from "@/types/graphql";
import { 
Text,
Box,
Avatar,
} from "@chakra-ui/react";

interface SettingInfoProps {
  project: Project | null;
  users: FindAllInfoUserAccessesProject[] | null;
}

const SettingInfo: React.FC<SettingInfoProps> = ({ users, project}) => {

  const [pseudo, setPseudo] = useState<string | undefined>("");
  const [nameProject, setNameProject] = useState<string | undefined>("");
  const [privateProject, setPrivateProject] = useState<string | undefined>("");

  useEffect(() => {
    const searchListUserOwner = users?.find((user :FindAllInfoUserAccessesProject) => user.role === "OWNER");
    setPseudo(searchListUserOwner?.user?.pseudo);
    setNameProject(project?.name);
    setPrivateProject(project?.private ? "Private" : "Public")
  }, [users, project])

  return (
    <Box display="flex" justifyContent="center" alignItems="center" >
      <Box mt={4} width="250px" display="flex" flexDirection="column" alignItems="center">
        <Avatar name={pseudo} mb={4} />
        <Text color="white" mb={2} textAlign="center">By {pseudo}</Text>
        <Box mt={14}>
          <Text color="white" mb={2} textAlign="center">Name : {nameProject}</Text>
        </Box>
        <Box mt={3}>
          <Text color="white" mb={2} textAlign="center">Visibility : {privateProject}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingInfo;