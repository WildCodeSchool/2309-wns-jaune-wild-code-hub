import React, { useState, useEffect } from "react";
import { User } from "@/types/graphql";
import { 
  Button,
  Text,
  Input,
  Box,
  Select,
} from "@chakra-ui/react";
import CustomToast from '@/components/ToastCustom/CustomToast';

interface ShareAddPeopleProps {
    users : User | null;
}

const ShareAddPeople: React.FC<ShareAddPeopleProps> = ({ users }) => {

  const { showAlert } = CustomToast();


  return (
    <Box>
        <Text color="white" fontSize="18px" mb={5}>Add People :</Text>
        <Box mt={2}>
        <Text color="white" mb={2}>Pseudo</Text>
        <Input value={""} placeholder="url" />
        </Box>
        <Box mt={2}>
        <Text color="white" mb={2}>Role</Text>
        <Select 
            placeholder="Select role"
            size="sm"
            width="auto"
            mr={3}
        >
            <option value="EDITOR">Editor</option>
            <option value="VIEWER">View</option>
        </Select>
        </Box>
        <Box display="flex" justifyContent="center" mt={10}>
        <Button type="button" variant="secondary">
            Add
        </Button>
        </Box>
    </Box>
  );
};

export default ShareAddPeople;