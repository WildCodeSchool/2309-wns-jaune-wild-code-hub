import React, { useState } from "react";
import { InputProps } from "./TextInput";
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const PasswordInput = ({
  label,
  name,
  value,
  error,
  onChange,
}: Omit<InputProps, "inputType">) => {
  const [show, setShow] = useState(false);

  return (
    <FormControl isInvalid={error ? true : false}>
      <FormLabel>{label} </FormLabel>
      <InputGroup>
        <Input
          color="grey"
          bg="white"
          type={show ? "text" : "password"}
          name={name}
          value={value}
          autoComplete="new-password"
          onChange={onChange}
        />
        <InputRightElement>
          <IconButton
            aria-label="show or hide password"
            color={"placeholder"}
            onClick={() => setShow(!show)}
            icon={show ? <ViewOffIcon boxSize={7} /> : <ViewIcon boxSize={7} />}
          />
        </InputRightElement>
      </InputGroup>
      {/* {error && (
        <FormErrorMessage
          fontStyle={"italic"}
          position={"absolute"}
          padding={"0 1rem 0 0.5rem"}
          mt={1}
        >
          {error}
        </FormErrorMessage>
      )} */}
    </FormControl>
  );
};
