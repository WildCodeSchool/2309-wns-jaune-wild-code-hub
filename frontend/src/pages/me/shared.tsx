import SidebarLayout from "@/components/SidebarLayout";
import React from "react";
import { NextPageWithLayout } from "../_app";

const SharedWithMe: NextPageWithLayout = () => {
  return <div>Shared With Me</div>;
};
SharedWithMe.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
export default SharedWithMe;
