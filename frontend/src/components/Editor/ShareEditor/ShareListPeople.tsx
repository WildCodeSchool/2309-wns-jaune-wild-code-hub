import React, { useState } from "react";
import { FindAllInfoUserAccessesProject } from "@/types/graphql";
import { 
  Text,
  Box,
  Select,
  List, 
  ListItem,
  useBreakpointValue,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import CustomToast from '@/components/ToastCustom/CustomToast';

interface ShareListPeopleProps {
  users : FindAllInfoUserAccessesProject[] | null;
}

interface MutationContext {
  id: number;
  role: string;
  pseudo: string;
}

const ShareListPeople: React.FC<ShareListPeopleProps> = ({ users }) => {

  const { showAlert } = CustomToast();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const userPerPage: number = 4;
  const indexLast = currentPage * userPerPage;
  const indexFirst = indexLast - userPerPage;

  const pagination = () : FindAllInfoUserAccessesProject[] | undefined => {
    const filterOwner = users?.filter((user: FindAllInfoUserAccessesProject) => user.role !== "OWNER");
    return filterOwner?.slice(indexFirst, indexLast);
  };

  const next = (): void => {
    if(!users) 
      return showAlert("error", "Please complete all fields in the form!");
    if (!(currentPage < Math.ceil(users?.length / userPerPage))) 
      return showAlert("error", "You are on the last page!");
    setCurrentPage(currentPage + 1);
  };
  
  const previous = (): void => {
    if(!users) 
      return showAlert("error", "Please complete all fields in the form!");
    if (!(currentPage > 1)) 
      return showAlert("error", "You are on the first page!");
    setCurrentPage(currentPage - 1);
  };


  const pseudoFontSize = useBreakpointValue({ base: "12px", sm: "14px", md: "16px", lg: "18px" });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" >
      <Box  width="100%" maxWidth="250px">
        <List spacing={3}>
          {pagination()?.map(user => {
            return (
              <ListItem 
                key={user.user_id} 
                display="flex" 
                alignItems="center" 
                justifyContent="space-between" 
              >
                <Box display="flex" alignItems="center" flex="1">
                  <Text color="white" mr={3} fontSize={pseudoFontSize}>{user.user?.pseudo}</Text>
                </Box>
                <Text color="white" mr={3} fontSize={pseudoFontSize}>{user.role}</Text>
              </ListItem>
            );
          })}
        </List>
        <ButtonGroup display="flex" alignItems="center" mt="10" ml="4" spacing={4}>
          <Button type="button" variant="outline" onClick={previous} ml={1} >
            {"< Prev"}
          </Button>
          <Button type="button" variant="secondary" onClick={next}>
            {"Next >"}
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default ShareListPeople;