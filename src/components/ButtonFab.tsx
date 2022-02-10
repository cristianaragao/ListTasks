import { Fab } from "native-base";

interface ButtonProp {
    label: string | JSX.Element;
    bg: string;
    color: string;
    onPress: () => void;
}

const ButtonFab = ({ label, bg, color, onPress }: ButtonProp) => {
    return (
        <Fab
                label={label}
                bottom="5"
                left="12"
                right="12"
                renderInPortal={false}
                borderRadius={7}
                padding={0}
                bg={bg}
                _text={{
                    color: color,
                    fontWeight: "bold",
                }}
                onPress={onPress}
            />
    );
};

export default ButtonFab;