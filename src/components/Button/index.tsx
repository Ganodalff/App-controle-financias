import { ForwardRefRenderFunction } from "react";
import { Button, ButtonProps } from "react-native-paper";
import { Text } from "react-native";

type SubmitButtonProps = { children: string } & Omit<ButtonProps, "theme">;

const SubmitButton: ForwardRefRenderFunction<ButtonProps, SubmitButtonProps> = (
  props
) => {
  return (
    <Button
      {...props}
      labelStyle={{ color: "white" }}
      uppercase={true}
      style={[
        {
          width: "100%",
          backgroundColor: "black",
          borderRadius: 10,
          marginTop: 40,
          padding: 10,
        },
        props.style,
      ]}
    >
      <Text
        style={{
          color: "#fff",
          letterSpacing: 1,
          fontFamily: "Roboto_500Medium",
        }}
      >
        {props.children}
      </Text>
    </Button>
  );
};

export default SubmitButton;
