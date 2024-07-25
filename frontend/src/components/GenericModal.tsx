import React, { ReactNode }from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalHeader,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import components from "@/styles/theme/components";

interface GenericModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title ?: string
}


const GenericModal: React.FC<GenericModalProps> = ({ isOpen, onClose, children, title }) => {
    const titleFontSize = useBreakpointValue({ base: "2xl", sm: "3xl" });
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent bg="black" width='100vw' height='55vh' {...components.ModalBody.bordered}>
                <ModalCloseButton color="text" fontWeight="bold" />
                <Text fontSize={titleFontSize} color="white" as='b' textAlign="center" mt={10}>{title}</Text>
                <ModalBody bg="black" {...components.ModalBody.bordered}>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default GenericModal;