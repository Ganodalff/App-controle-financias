import { forwardRef, ForwardRefRenderFunction } from "react";
import { TextInput as NativeTextInput } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

export type InputProps = Omit<TextInputProps, "theme">;

const Input: ForwardRefRenderFunction<NativeTextInput, InputProps> = (
  props,
  ref
) => {
  return (
    <TextInput
      {...props}
      dense={true}
      mode="outlined"
      outlineColor="transparent"
      placeholderTextColor="#CCCCCC"
      style={[{ borderRadius: 8, backgroundColor: "#f4f4f4" }, props.style]}
      ref={ref}
    />
  );
};

export default forwardRef(Input);
