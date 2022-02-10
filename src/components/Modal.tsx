import React from "react";

import { AlertDialog, Button } from "native-base";

import { Ionicons } from "@expo/vector-icons";

import ButtonIcon from "./ButtonIcon";

interface ButtonProp {
  label: string;
  doneLabel: string;
  color: string;
  donePress: () => void;
  description: string;
}

const Modal = ({
  label,
  description,
  color,
  doneLabel,
  donePress,
  ...props
}: ButtonProp) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const cancelRef = React.useRef(null);

  const onClose = () => setIsOpen(false);

  return (
    <>
      <ButtonIcon
        size={7}
        name="trash-bin"
        colorButton={color}
        colorIcon="white"
        icon={<Ionicons />}
        onPress={() => setIsOpen(!isOpen)}
      />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{label}</AlertDialog.Header>
          <AlertDialog.Body>{description}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Cancelar
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => {
                  donePress();
                  onClose();
                }}
              >
                {doneLabel}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

export default Modal;
