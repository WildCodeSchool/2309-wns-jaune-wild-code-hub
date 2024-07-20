import React, { ReactNode }from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalHeader,
    Text,
} from '@chakra-ui/react';
import components from "@/styles/theme/components";

interface GenericModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title ?: string
}

const GenericModal: React.FC<GenericModalProps> = ({ isOpen, onClose, children, title }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="black" {...components.ModalBody.bordered}>
                <ModalCloseButton color="text" fontWeight="bold" />
                <Text fontSize='3xl' color="white" as='b' textAlign="center" mt={5}>{title}</Text>
                <ModalBody bg="black" {...components.ModalBody.bordered} mt={5} mb={5}>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default GenericModal;