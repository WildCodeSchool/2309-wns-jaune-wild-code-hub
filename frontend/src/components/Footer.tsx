import React from 'react';
import { Box, Flex, Text, Link, Input, Button, Divider, Icon } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="black" pt={10} px={5} color="white">
      <Flex justify="space-around" wrap="wrap" mb={4} direction={{ base: 'column', md: 'row' }} align={{ base: 'center', md: 'start' }}>
        <Box textAlign={{ base: 'center', md: 'left' }} mb={{ base: 5, md: 0 }}>
          <Text fontSize="lg" fontWeight="bold">Wild Code Hub</Text>
          <Link href="#" color="gray.500" display="block">About Us</Link>
          <Link href="#" color="gray.500" display="block">Why Choose us</Link>
        </Box>
        <Box textAlign={{ base: 'center', md: 'left' }} mb={{ base: 5, md: 0 }}>
          <Text fontSize="lg" fontWeight="bold">Resources</Text>
          <Link href="#" color="gray.500" display="block">Privacy Policy</Link>
          <Link href="#" color="gray.500" display="block">Terms and Condition</Link>
        </Box>
        <Box textAlign={{ base: 'center', md: 'left' }} mb={{ base: 5, md: 0 }}>
          <Text fontSize="lg" fontWeight="bold">Contact Us</Text>
          <Link href="mailto:wildcodehub@gmail.fr" color="gray.500" display="block">wildcodehub@gmail.fr</Link>
        </Box>
        <Box textAlign={{ base: 'center', md: 'left' }} mb={{ base: 5, md: 0 }}>
          <Text fontSize="lg" fontWeight="bold">Subscribe to our newsletter</Text>
          <Flex mt={2} justify={{ base: 'center', md: 'start' }}>
            <Input placeholder="Email" mr={2} width={{ base: '70%', md: 'auto' }} />
            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </Flex>
        </Box>
      </Flex>
        <Flex justify="center" align="center" direction="column">
        <Flex align="center" mb={4} width="100%">
          <Divider orientation="horizontal" flex="1" />
          <Text mx={2} fontSize="sm" color="gray.500" textAlign="center">
            (c) 2023 Wild Code Hub. All rights reserved
          </Text>
          
        <Link href="https://github.com" isExternal>
          <Icon fontSize="sm" as={FaGithub} w={5} h={5} color="gray.600" />
        </Link>
        <Divider orientation="horizontal" flex="1" />
        </Flex>
        
      </Flex>
    </Box>
  );
};

export default Footer;
