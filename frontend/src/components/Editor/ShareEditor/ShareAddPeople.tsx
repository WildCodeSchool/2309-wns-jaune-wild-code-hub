import React, { useState, useEffect } from "react";
import { 
  FindAllInfoUserAccessesProject,
  ListUsersByPseudoQuery,
  ListUsersByPseudoQueryVariables,
  User
} from "@/types/graphql";
import { Button, Text, Box, Select } from "@chakra-ui/react";
import CustomToast from '@/components/ToastCustom/CustomToast';
import ReactSelect, { StylesConfig, SingleValue } from 'react-select';
import { LIST_USERS_BY_PSEUDO } from "@/requetes/queries/user.queries";
import { CREATE_USERS_ACCESSES_PROJECTS } from "@/requetes/mutations/usersAccessesProjects.mutations";
import { 
  AddAccessProjectMutation,
  AddAccessProjectMutationVariables
} from "@/types/graphql";
import { useLazyQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

interface ShareAddPeopleProps {
  setUsers: React.Dispatch<React.SetStateAction<FindAllInfoUserAccessesProject[] | null>>;
}

interface UserOption {
  value: string;
  label: string;
}

const ShareAddPeople: React.FC<ShareAddPeopleProps> = ({ setUsers }) => {

  const router = useRouter();

  const { showAlert } = CustomToast();
  const [selectedUser, setSelectedUser] = useState<SingleValue<UserOption> | null>(null);
  const [role, setRole] = useState<string>("");
  const [listPseudo, setListPseudo] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [authorizeSearchTerm, setAuthorizeSearchTerm] = useState<boolean>(false);

  const [getUsersByPseudo] = useLazyQuery<ListUsersByPseudoQuery, ListUsersByPseudoQueryVariables>(LIST_USERS_BY_PSEUDO, {
    onCompleted: (data) => {
      const newData = data?.listUsersByPseudo.map((item: any) => {
        const { __typename, ...rest } = item;
        return { ...rest };
      });
      setListPseudo(newData);
    },
    onError: (error) => {
      console.log(error);
      showAlert("error", "We are sorry, there seems to be an error with the server. Please try again later.");
    },
  });

  const [addAccessProject] = useMutation<
    AddAccessProjectMutation,
    AddAccessProjectMutationVariables
  >(CREATE_USERS_ACCESSES_PROJECTS, {
    onCompleted: (data) => {
      if (data?.addAccessProject?.message?.success) {
        setUsers(data?.addAccessProject?.listUsersAccessesProjectData ?? []);
        showAlert("success", "User(s) added successfully!");
      } else {
        showAlert(
          "success",
          data?.addAccessProject?.message?.message ? 
            data?.addAccessProject?.message?.message
          :
            "We are sorry, there seems to be an error with the server. Please try again later."
        );
      }
    },
    onError(error) {
      showAlert(
        'error',
        error.message ?
          error.message
        :
          "We are sorry, there seems to be an error with the server. Please try again later."
      );
    }
  });

  useEffect(() => {
    if (authorizeSearchTerm) {
      getUsersByPseudo({ variables: { pseudo: searchTerm } });
    }
  }, [searchTerm, authorizeSearchTerm]);

  const userOptions = listPseudo.map(user => ({ 
    value: user.id.toString(), // Ensure value is a string
    label: user.pseudo,
  }));

  const searchListPseudo = (inputValue: string) => {
    setSearchTerm(inputValue);
    setAuthorizeSearchTerm(inputValue.length > 0);
  }

  const handleClick = () => {
    if (!selectedUser || role.length === 0 || !router.query.id || typeof +router.query.id !== "number") {
      return showAlert("error", "Please complete all fields in the form!");
    }
    addAccessProject({
      variables: {
        data: {
          user_id: +selectedUser.value,
          project_id: +router.query.id,
          role: role
        }
      },
    });
  };

  const customStyles: StylesConfig<UserOption, false> = { // Use false here for single value
    control: (provided) => ({
      ...provided,
      minHeight: '15px',
      maxWidth: '100%',
      fontSize: '14px',
      backgroundColor: 'black',
      borderColor: '#2D3748',
      color: 'white',
      borderRadius: 'md',
      _hover: {
        borderColor: '#4A5568',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1A202C',
      color: 'white',
      borderRadius: 'md',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#a3c7fa' : '#1A202C',
      color: 'white',
      fontSize: '16px',
      _hover: {
        backgroundColor: state.isFocused ? 'black' : 'white',
      },
      borderRadius: 'md',
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '14px',
      color: 'white',
    }),
    singleValue: (provided) => ({
      ...provided,
      borderRadius: 'md',
      color: 'white',
    }),
    input: (provided) => ({
      ...provided,
      color: 'white',
    }),
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" >
      <Text color="white" fontSize="18px" mb={5}>Add People :</Text>
      <Box mt={2} width="100%" maxWidth="300px">
        <Text color="white" mb={2}>Pseudo</Text>
        <ReactSelect
          options={userOptions}
          value={selectedUser}
          onChange={(selectedOption) => setSelectedUser(selectedOption as SingleValue<UserOption>)}
          onInputChange={(inputValue) => searchListPseudo(inputValue)}
          placeholder="Select users"
          styles={customStyles}
        />
      </Box>
      <Box mt={3} width="100%" maxWidth="300px">
        <Text color="white" mb={2}>Role</Text>
        <Select
          size="sm"
          width="100%"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select role</option>
          <option value="EDITOR">Editor</option>
          <option value="VIEWER">Viewer</option>
        </Select>
      </Box>
      <Box display="flex" justifyContent="center" mt={10} width="100%" maxWidth="400px">
        <Button type="button" variant="secondary" onClick={handleClick}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default ShareAddPeople;