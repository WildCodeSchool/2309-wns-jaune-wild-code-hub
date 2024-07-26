import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Text,
  Code,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  Center,
  IconButton,
} from "@chakra-ui/react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import { ImperativePanelHandle } from "react-resizable-panels";

interface TerminalProps {
  logs: any[];
  panelRef: React.RefObject<ImperativePanelHandle>;
}

const Terminal: React.FC<TerminalProps> = ({ logs, panelRef }) => {
  const outputRef = useRef<HTMLDivElement>(null);
  const [expandedState, setExpandedState] = useState<{
    [logIndex: number]: { [argIndex: number]: boolean };
  }>({});
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleTerminal = () => {
    const panel = panelRef.current;
    if (panel?.isCollapsed()) {
      panel.expand();
      setIsCollapsed(false);
    } else {
      panel?.collapse();
      setIsCollapsed(true);
    }
  };

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
          return (
            <Text as="pre" key={argIndex} color={typeof arg === "string" ? "blue.500" : "white"}>
              {content}
            </Text>
          );
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
    <Flex paddingTop={"0.2rem"} height={"100%"}>
      <Box height={"100%"} width={"100%"}>
        <Flex justifyContent={"space-between"}>
          <Center height={"2.5rem"} bg="background2" width={"4rem"}>
            Bash
          </Center>
          <IconButton
            variant={"ghost"}
            onClick={toggleTerminal}
            aria-label={isCollapsed ? "Show Terminal" : "Hide Terminal"}
            icon={isCollapsed ? <ChevronUpIcon /> : <ChevronDownIcon />}
          ></IconButton>
        </Flex>

        <Box
          height={"calc(100% - 2.5rem)"}
          width={"100%"}
          bg={"background2"}
          overflow={"auto"}
          ref={outputRef}
        >
          {logs.map((log, logIndex) => (
            <Box key={logIndex} borderBottom="1px solid gray" py={1}>
              {renderLogMessage(log, logIndex)}
            </Box>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};

export default Terminal;