import { VStack, Button, IconButton, Icon } from "native-base";

interface ButtonProp {
  icon: React.ReactNode;
  name: string;
  size: number;
  colorButton: string;
  colorIcon: string;
  onPress?: () => void;
}

const ButtonIcon = ({
  icon,
  name,
  size,
  colorButton,
  colorIcon,
  onPress,
}: ButtonProp) => {
  return (
    <Button
      size={8}
      style={{ marginHorizontal: 3 }}
      bg={colorButton}
      onPress={onPress}
    >
      <Icon as={icon} name={name} color={colorIcon} size={size - 2} />
    </Button>
  );
};

export default ButtonIcon;
