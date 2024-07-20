import React, { useState, useEffect } from "react";
import { User } from "@/types/graphql";
import { 
  Text,
  Box,
  Select,
  List, 
  ListItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import CustomToast from '@/components/ToastCustom/CustomToast';
import { CloseIcon } from "@chakra-ui/icons";

interface ShareManagementPeopleProps {
    users : User | null;
}

const ShareManagementPeople: React.FC<ShareManagementPeopleProps> = ({ users }) => {

  const { showAlert } = CustomToast();

  // Sample data for the list of people to delete
  const peopleToDelete = [
    { id: 1, name: "JohnDocscse", email : 'alex@gmail.com' },
    { id: 2, name: "JanecscsSmith", email : 'alex@gmail.com'},
    { id: 3, name: "EmilysccscsJohnson", email : 'alex@gmail.com'},
  ];

  // Function to handle deletion
  const handleDelete = (id: number) => {
    // Replace this with actual delete logic
    showAlert("info", `Deleted user with id: ${id}`);
  };

  // Function to handle role change
  const handleRoleChange = (id: number, role: string) => {
    // Replace this with actual role change logic
    showAlert("info", `Changed role to ${role} for user with id: ${id}`);
  };

  // Responsive font size for pseudo
  const pseudoFontSize = useBreakpointValue({ base: "12px", sm: "14px", md: "16px", lg: "18px" });

  return (
    <Box mt={5}>
      <Text color="white" mb={2} fontSize="18px" >Management People :</Text>
      <Box mt={5}>
        <List spacing={3}>
          {peopleToDelete.map(person => (
            <ListItem 
              key={person.id} 
              display="flex" 
              alignItems="center" 
              justifyContent="space-between" 
            >
              <Box display="flex" alignItems="center" flex="1">
                <Text color="white" mr={3} fontSize={pseudoFontSize}>{person.name}</Text>
              </Box>
              <Select 
                  placeholder="Role"
                  size="sm"
                  width="auto"
                  mr={3}
                  onChange={(e) => handleRoleChange(person.id, e.target.value)}
                >
                  <option value="editor">Editor</option>
                  <option value="view">View</option>
                </Select>
              <CloseIcon />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ShareManagementPeople;