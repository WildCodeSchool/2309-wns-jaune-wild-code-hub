import Sidebar from "@/components/Sidebar";
import SidebarLayout from "@/components/SidebarLayout";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { NextPageWithLayout } from "../_app";

const Profile: NextPageWithLayout = () => {
  return (
    <div style={{ height: "150rem" }}>
      <h1>Welcome to your profile</h1>
    </div>
  );
};
Profile.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
export default Profile;
