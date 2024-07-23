import React, { useState } from "react";
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

interface ShareEditorProps {
  project: Project | null;
  expectedOrigin: string | undefined;
  users : FindAllInfoUserAccessesProject[] | null;
  setUsers: React.Dispatch<React.SetStateAction<FindAllInfoUserAccessesProject[] | null>>;
  checkOwner : boolean;
}

const ShareEditor: React.FC<ShareEditorProps> = ({ project, expectedOrigin, users, setUsers, checkOwner }) => {

  const { showAlert } = CustomToast();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const shareModalOpen: () => void = async () => {
    if (window.location.origin !== expectedOrigin) return;
    if (!project) {
      showAlert("error", "Please wait while the project loads!");
      return;
    }

    setIsShareModalOpen(true);
  };

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
      {
        !checkOwner ? 
          <ShareURL project={project}/>
        :
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
              <ShareAddPeople setUsers={setUsers} />
              <ShareManagementPeople users={users} setUsers={setUsers} />
            </TabPanel>
          </TabPanels>
          </Box>
        </Tabs>
      }
      </GenericModal>
    </>
  );
};

export default ShareEditor;