import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { ChangeEventHandler } from "react";

export type InputProps = {
  label: string;
  name: string;
  inputType?: string;
  value?: string;
  error?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  isInline?: boolean;
};

export const TextInput = ({
  label,
  name,
  inputType,
  value,
  error,
  onChange,
  isInline,
}: InputProps) => {
  return (
    <FormControl isInvalid={error ? true : false}>
      <Flex
        style={
          isInline
            ? {
                alignItems: "center",
                justifyContent: "space-between",
                paddingInline: "1rem",
              }
            : {
                flexDirection: "column",
              }
        }
      >
        <FormLabel>{label}</FormLabel>
        <Input
          width={isInline ? "60%" : "100%"}
          backgroundColor={"white"}
          color={"grey"}
          type={inputType || name}
          name={name}
          autoComplete="off"
          value={value}
          onChange={onChange}
        />
      </Flex>
      {error && (
        <FormErrorMessage
          fontStyle={"italic"}
          position={"absolute"}
          padding={"0 1rem 0 0.5rem"}
          right={0}
          width={isInline ? "60%" : "100%"}
          mt={1}
        >
          {error}
        </FormErrorMessage>
      )}
      {/* <FormHelperText>
      Enter the email you&apos;d like to receive the newsletter on.
    </FormHelperText> */}
    </FormControl>
  );
};
