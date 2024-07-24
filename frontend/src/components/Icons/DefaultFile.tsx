import { Icon, IconProps } from "@chakra-ui/react";
import React from "react";

const DefaultFileIcon = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 60 60" {...props}>
      <path
        d="M38.2762 3.75H9.375V56.25H50.625V16.0988L38.2762 3.75ZM13.125 52.5V7.5H35.625V18.75H46.875V52.5H13.125Z"
        fill="#C5C5C5"
      />
    </Icon>
  );
};

export default DefaultFileIcon;
