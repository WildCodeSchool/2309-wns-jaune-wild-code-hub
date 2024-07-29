import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { checkRegex, fileNamePattern } from "@/regex";

interface AddFileFormProps {
  addFile: (fileName: string) => void;
}

const AddFileForm: React.FC<AddFileFormProps> = ({ addFile }) => {
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit: (event: React.FormEvent) => void = (event: React.FormEvent) => {
    event.preventDefault();

    if (!checkRegex(fileNamePattern, fileName)) {
      setError(
        "File name must be in the format 'name.extension' and the extension must be js, css, or html."
      );
      return;
    }

    addFile(fileName);
    setFileName("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={!!error}>
        <FormLabel>Name File :</FormLabel>
        <Input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          required
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit">
        New File
      </Button>
    </form>
  );
};

export default AddFileForm;