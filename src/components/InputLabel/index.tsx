import { Text } from "react-native";

type InputLabelProps = {
  title: string;
};

const InputLabel = ({ title }: InputLabelProps) => {
  return (
    <Text
      style={{ marginTop: 10, fontSize: 16, fontFamily: "SoraRegular" }}
    >
      {title}
    </Text>
  );
};

export default InputLabel;
