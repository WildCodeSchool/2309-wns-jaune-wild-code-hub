import SidebarLayout from "@/components/SidebarLayout";
import React from "react";
import { NextPageWithLayout } from "../_app";

const Projects: NextPageWithLayout = () => {
  return <div>Projects</div>;
};
Projects.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
export default Projects;
