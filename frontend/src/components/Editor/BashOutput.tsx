import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Text,
  Code,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";

interface BashOutputProps {
  logs: any[];
}

const BashOutput: React.FC<BashOutputProps> = ({ logs }) => {
  const outputRef = useRef<HTMLDivElement>(null);
  const [expandedState, setExpandedState] = useState<{
    [logIndex: number]: { [argIndex: number]: boolean };
  }>({});

  useEffect(() => {
    const scrollToBottom = () => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [logs]);

  const toggleAccordion = (logIndex: number, argIndex: number) => {
    setExpandedState((prevState) => ({
      ...prevState,
      [logIndex]: {
        ...prevState[logIndex],
        [argIndex]: !prevState[logIndex]?.[argIndex],
      },
    }));
  };

  const renderLogMessage = (log: any, logIndex: number) => {
    const renderedMessages: JSX.Element[] = [];

    const processArgs = (args: any[]) => {
      return args.map((arg, argIndex) => {
        const content =
          typeof arg === "object"
            ? JSON.stringify(arg, null, 2)
            : arg.toString();

        if (typeof arg === "object") {
          return (
            <Accordion allowToggle key={argIndex}>
              <AccordionItem>
                <h2>
                  <AccordionButton
                    onClick={() => toggleAccordion(logIndex, argIndex)}
                    bg="background2"
                  >
                    {expandedState[logIndex]?.[argIndex] ? (
                      <ChevronDownIcon />
                    ) : (
                      <ChevronRightIcon />
                    )}
                    {Array.isArray(arg) ? " Array" : " Object"}
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <Code
                    color="accent"
                    bg="background2"
                    p={2}
                    display="block"
                    whiteSpace="pre-wrap"
                  >
                    {content}
                  </Code>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          );
        } else {
          return <Text key={argIndex}>{content}</Text>;
        }
      });
    };

    renderedMessages.push(...processArgs(log.rawArgs));

    return (
      <Box whiteSpace="pre-wrap" key={logIndex}>
        {renderedMessages}
      </Box>
    );
  };

  return (
    <Box
      height={"calc(100% - 2.5rem)"}
      width={"100%"}
      bg={"background2"}
      overflow={"auto"}
    >
      {logs.map((log, logIndex) => (
        <Box key={logIndex} borderBottom="1px solid gray" py={1}>
          {renderLogMessage(log, logIndex)}
        </Box>
      ))}
    </Box>
  );
};

export default BashOutput;
