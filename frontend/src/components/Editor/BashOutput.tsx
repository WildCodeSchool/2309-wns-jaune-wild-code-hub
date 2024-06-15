import React, { useEffect, useRef, useState } from "react";
import { Box, Text, Code, Accordion, AccordionItem, AccordionButton, AccordionPanel } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";

interface BashOutputProps {
  logs: any[];
}

const BashOutput: React.FC<BashOutputProps> = ({ logs }) => {
  const outputRef = useRef<HTMLDivElement>(null);
  const [accordionIndex, setAccordionIndex] = useState<number | null>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [logs]);

  const toggleAccordion = (index: number) => {
    setAccordionIndex(accordionIndex === index ? null : index);
  };

  const renderLogMessage = (log: any, index: number) => {
    const content = typeof log.rawArgs[0] === 'object' ? JSON.stringify(log.rawArgs[0], null, 2) : log.message;

    const isObjectOrArray = (value: any) => {
      return typeof value === 'object' && value !== null;
    };

    if (typeof log.rawArgs[0] === 'object') {
      return (
        <Accordion allowToggle key={index}>
          <AccordionItem>
            <h2>
              <AccordionButton onClick={() => toggleAccordion(index)} bg="background2">
                {isObjectOrArray(log.rawArgs[0]) ? (accordionIndex === index ? <ChevronDownIcon/> : <ChevronRightIcon/>) : ""}
                {isObjectOrArray(log.rawArgs[0]) ? (Array.isArray(log.rawArgs[0]) ? " Array" : " Object") : ""}
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Code color="accent" bg="background2" p={2} display="block" whiteSpace="pre-wrap">
                {content}
              </Code>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      );
    }
    return <Text whiteSpace="pre-wrap">{log.message}</Text>;
  };

  return (
    <Box p={4} bg="background2" color="white" height="210px" overflowY="scroll" ref={outputRef}>
      {logs.map((log, index) => (
        <Box key={index} borderBottom="1px solid gray" py={1}>
          {renderLogMessage(log, index)}
        </Box>
      ))}
    </Box>
  );
};

export default BashOutput;