import React, { useState } from "react";
import { Project, FindAllInfoUserAccessesProject } from "@/types/graphql";
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
import CustomToast from "@/components/ToastCustom/CustomToast";
import ShareURL from "./ShareURL";
import ShareAddPeople from "./ShareAddPeople";
import ShareManagementPeople from "./ShareManagementPeople";
import ShareListPeople from "./ShareListPeople";

interface ShareEditorProps {
  project: Project | null | Pick<Project, "id" | "category" | "name">;
  expectedOrigin?: string | undefined;
  users: FindAllInfoUserAccessesProject[] | null;
  setUsers: React.Dispatch<
    React.SetStateAction<FindAllInfoUserAccessesProject[] | null>
  >;
  checkOwner?: boolean;
  admin?: boolean;
}

const ShareEditor: React.FC<ShareEditorProps> = ({
  project,
  users,
  setUsers,
  checkOwner,
  admin,
}) => {
  
  const { showAlert } = CustomToast();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const shareModalOpen: () => void = async () => {
    if (!admin)
      if (!project)
        return showAlert("error", "Please wait while the project loads!");
    setIsShareModalOpen(true);
  };

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        size={"sm"}
        paddingInline={6}
        onClick={shareModalOpen}
      >
        Share
      </Button>

      <GenericModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Share project"
      >
        <Tabs>
          <TabList
            mb={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Tab
              _selected={{
                color: "primary",
                borderBottom: "2px solid primary",
              }}
              _focus={{ boxShadow: "none" }}
            >
              Share URL
            </Tab>
            {checkOwner  || admin ? (
              <Tab
                _selected={{
                  color: "primary",
                  borderBottom: "2px solid primary",
                }}
                _focus={{ boxShadow: "none" }}
              >
                Add people
              </Tab>
            ) : (
              <Tab
                _selected={{
                  color: "primary",
                  borderBottom: "2px solid primary",
                }}
                _focus={{ boxShadow: "none" }}
              >
                List people
              </Tab>
            )}
            {checkOwner  || admin && (
              <Tab
                _selected={{
                  color: "primary",
                  borderBottom: "2px solid primary",
                }}
                _focus={{ boxShadow: "none" }}
              >
                Management
              </Tab>
            )}
          </TabList>
          <Box>
            <TabPanels>
              <TabPanel>
                <ShareURL project={project} />
              </TabPanel>
              {checkOwner  || admin ? (
                <TabPanel>
                  {
                    admin ?
                      <ShareAddPeople setUsers={setUsers} project={project} admin={true} />
                    :
                      <ShareAddPeople setUsers={setUsers} project={project}/>
                  }
                </TabPanel>
              ) : (
                <TabPanel>
                  <ShareListPeople users={users} admin={true} />
                </TabPanel>
              )}
              {checkOwner || admin && (
                <TabPanel>
                  {
                    admin ? 
                      <ShareManagementPeople users={users} setUsers={setUsers} admin={true} />
                    :
                      <ShareManagementPeople users={users} setUsers={setUsers} />
                  }
                </TabPanel>
              )}
            </TabPanels>
          </Box>
        </Tabs>
      </GenericModal>
    </>
  );
};

export default ShareEditor;
