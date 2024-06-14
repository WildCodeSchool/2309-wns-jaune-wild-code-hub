import React, { useEffect, useRef } from "react";
import { Box, Text } from "@chakra-ui/react";

interface BashOutputProps {
  logs: string[];
}

const BashOutput: React.FC<BashOutputProps> = ({ logs }) => {
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [logs]);

  return (
    <Box p={4} bg="gray" color="white" height="150px" overflowY="scroll" mt={4} ref={outputRef}>
      {logs.map((log, index) => (
        <Box key={index} borderBottom="1px solid #14181F" py={1}>
          <Text color="white" whiteSpace="pre-wrap">{log}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default BashOutput;