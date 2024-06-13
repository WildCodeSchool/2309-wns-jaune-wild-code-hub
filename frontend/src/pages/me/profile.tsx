import Sidebar from "@/components/Sidebar";
import SidebarLayout from "@/components/SidebarLayout";
import { Flex } from "@chakra-ui/react";
import React from "react";

const Profile = () => {
  return (
    <SidebarLayout>
      <div style={{ height: "150rem" }}>
        <h1>Welcome to your profile</h1>
      </div>
    </SidebarLayout>
  );
};

export default Profile;
