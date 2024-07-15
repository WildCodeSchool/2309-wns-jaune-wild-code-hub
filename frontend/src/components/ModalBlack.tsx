import {
    Button,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
  } from '@chakra-ui/react';
import components from "@/styles/theme/components";

const ModalBlack = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
        <Button onClick={onOpen} variant="primary" >Open Modal</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="black" {...components.ModalBody.bordered}>
            <ModalCloseButton color="text" fontWeight="bold" />
            <ModalBody bg="black" {...components.ModalBody.bordered}>
                <Text color="white">Modal</Text>
            </ModalBody>
            </ModalContent>
        </Modal>
        </>
    );
}

export default ModalBlack;