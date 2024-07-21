import React, { useState } from "react";
import { FindAllInfoUserAccessesProject } from "@/types/graphql";
import { 
  Button,
  Text,
  Input,
  Box,
  Select,
} from "@chakra-ui/react";
import CustomToast from '@/components/ToastCustom/CustomToast';

interface ShareAddPeopleProps {
    users : FindAllInfoUserAccessesProject[] | null;
}

const ShareAddPeople: React.FC<ShareAddPeopleProps> = ({ users }) => {

  const { showAlert } = CustomToast();

  const [pseudo, setPseudo] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const hundleClick = () => {

    if (pseudo.length === 0 || role.length === 0)
      return showAlert("error", "Please complete all fields in the form!");

    showAlert("success", "yo")
  }

  return (
    <Box>
        <Text color="white" fontSize="18px" mb={5}>Add People :</Text>
        <Box mt={2}>
          <Text color="white" mb={2}>Pseudo</Text>
          <Input 
            value={pseudo}
            placeholder="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
          />
        </Box>
        <Box mt={2}>
          <Text color="white" mb={2}>Role</Text>
          <Select 
              size="sm"
              width="auto"
              mr={3}
              value={role}
              onChange={(e) => setRole(e.target.value)}
          >
              <option value="">Select role</option>
              <option value="EDITOR">Editor</option>
              <option value="VIEWER">View</option>
          </Select>
        </Box>
        <Box display="flex" justifyContent="center" mt={10}>
          <Button type="button" variant="secondary" onClick={hundleClick}>
              Add
          </Button>
        </Box>
    </Box>
  );
};

export default ShareAddPeople;