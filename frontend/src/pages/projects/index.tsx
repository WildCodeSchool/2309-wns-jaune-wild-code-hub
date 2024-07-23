import Loader from "@/components/Loader";
import { ProfilePageContainer } from "@/components/ProfilePageContainer";
import { ProjectsGrid } from "@/components/ProjectsGrid";
// import SidebarLayout from "@/components/Sidebar/SidebarLayout";
import {
  Project,
  useListPublicProjectsLazyQuery,
} from "@/types/graphql";
import { Box, Button, Center, Flex, Heading, Stack } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import box from "@/styles/theme/components/Box";

const Workspace: NextPageWithLayout = () => {
  const [projects, setProjects] = useState<Omit<Project, "files">[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberCount, setNumberCount]  = useState<number>(1)

  const [getPublicProjects, { error, loading, data }] =
    useListPublicProjectsLazyQuery()
    useEffect(() => {
      {
        getPublicProjects({          
            variables: { offset: 8*(currentPage-1), limit: 8 },         
            onCompleted(data) {
            setNumberCount(
              data.listPublicProjects.total
            )
            setProjects(
              data.listPublicProjects.projects
            );
          },
        });
      }
  }, [currentPage, getPublicProjects, data]);




  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  const previous = () => {
        
    setCurrentPage(currentPage - 1);
  };


  return (
    <Box paddingTop="5rem" bg={"black"}>
      <ProfilePageContainer>
   
   <Heading textAlign="center" color="white" fontSize={{ base: "36px"}} paddingBottom={{ base: "3rem", md: "40px" }}>What Wild Code Hub offers</Heading>
  
    {loading ? (
          <Loader />
        ) : error ? (
          <>An error occured</>
        ) : projects.length > 0 ? 
        (  
          <ProjectsGrid projects={projects} />
        ) : (
          <>There is no projects</>
    )}
   
  
   <Stack direction={{ base: "column", md: "row" }} marginTop={"4rem"} gap={"2rem"}> 
       <Button variant={"outline"} w={"fit-content"} px={"3rem"} onClick={previous} isDisabled={currentPage === 1 }>Prev</Button>
       <Button variant={"secondary"}  w={"fit-content"} px={"3rem"} onClick={next} isDisabled={currentPage === Math.ceil(numberCount / 8)}>Next</Button>
   </Stack>
 </ProfilePageContainer>

    </Box>
    
  );
};

export default Workspace;
