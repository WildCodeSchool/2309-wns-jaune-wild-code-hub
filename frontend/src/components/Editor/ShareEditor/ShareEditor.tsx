import React, { useState, useEffect } from "react";
import { 
  Project,
  FindAllInfoUserAccessesProject
} from "@/types/graphql";
import GenericModal from "@/components/GenericModal";
import { 
  Button,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import CustomToast from '@/components/ToastCustom/CustomToast';
import ShareURL from "./ShareURL";
import ShareAddPeople from "./ShareAddPeople";
import ShareManagementPeople from "./ShareManagementPeople";
import { LIST_USERS_ACCESSES_PROJECT } from "@/requetes/queries/usersAccessesProjects.queries";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

interface ShareEditorProps {
  project: Project | null;
  expectedOrigin: string | undefined;
}

const ShareEditor: React.FC<ShareEditorProps> = ({ project, expectedOrigin }) => {

  const { showAlert } = CustomToast();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [users, setUsers] = useState<FindAllInfoUserAccessesProject[] | null >(null);

  const router = useRouter();

  const userData = useQuery(LIST_USERS_ACCESSES_PROJECT, { variables: { projectId: router.query.id ? +router.query.id : null } });
  
  const shareModalOpen: () => void = async () => {
    if (window.location.origin !== expectedOrigin) return;
    if (!project) {
      showAlert("error", "Please wait while the project loads!");
      return;
    }

    setIsShareModalOpen(true);
  };

  useEffect(() => {
    setUsers(userData?.data?.listUsersAccessesProject)
    console.log(userData)
  }, [userData])

  return (
    <>
      <Button type="button" variant="secondary" onClick={shareModalOpen}>
        Share
      </Button>

      <GenericModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Share project"
      >
        <Tabs>
          <TabList mb={5} display="flex" justifyContent="center" alignItems="center">
            <Tab 
              _selected={{ color: "primary", borderBottom: "2px solid primary" }}
              _focus={{ boxShadow: "none" }}
            >
              Share URL
            </Tab>
            <Tab 
              _selected={{ color: "primary", borderBottom: "2px solid primary" }}
              _focus={{ boxShadow: "none" }}
            >
              Management
            </Tab>
          </TabList>
          <Box>
          <TabPanels>
            <TabPanel>
              <ShareURL project={project}/>
            </TabPanel>
            <TabPanel>
              <ShareAddPeople users={users}/>
              <ShareManagementPeople users={users} setUsers={setUsers} />
            </TabPanel>
          </TabPanels>
          </Box>
        </Tabs>
      </GenericModal>
    </>
  );
};

export default ShareEditor;