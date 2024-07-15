import React from "react";
import { NextPageWithLayout } from "../_app";
import SidebarLayout from "@/components/SidebarLayout";

const Settings: NextPageWithLayout = () => {
  return <div>Settings</div>;
};
Settings.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
export default Settings;
