import SidebarLayout from "@/components/SidebarLayout";
import React from "react";
import { NextPageWithLayout } from "../_app";

const Favorites: NextPageWithLayout = () => {
  return <div>Favorites</div>;
};
Favorites.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
export default Favorites;
