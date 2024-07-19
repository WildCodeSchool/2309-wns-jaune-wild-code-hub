import React, { ReactNode }from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalHeader,
} from '@chakra-ui/react';
import components from "@/styles/theme/components";

interface GenericModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const GenericModal: React.FC<GenericModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="black" {...components.ModalBody.bordered}>
                <ModalCloseButton color="text" fontWeight="bold" />
                <ModalBody bg="black" {...components.ModalBody.bordered}>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default GenericModal;