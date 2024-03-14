import { background } from "@chakra-ui/react";

const button =  {
    primary: {
        defaultProps: {
            colorScheme: "green",
            size: "md",
        },
    },
    secondary: {
        defaultProps: {
            colorScheme: "blue",
            size: "sm",
        },
    },
    tertiary: {
        defaultProps: {
            colorScheme: "purple",
            size: "lg",
        },
    },
}

export default button;