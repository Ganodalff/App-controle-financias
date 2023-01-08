import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, ToastAndroid, View } from "react-native";
import { HelperText } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import SubmitButton from "../../components/Button";
import Input from "../../components/Input";
import InputLabel from "../../components/InputLabel";

const Login = () => {
  const { navigate } = useNavigation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSignIn = (data) => {
    if (data.email === "Admin" && data.password === "Admin")
      return navigate("Dashboard");
    return (
      navigate("Login"),
      ToastAndroid.show("Login ou senha incorretos", ToastAndroid.SHORT)
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        flex: 1,
        height: "100%",
      }}
    >
      <View style={{ padding: 20 }}>
        <StatusBar style="auto" />
        <Text
          style={{
            fontSize: 30,
            marginTop: 20,
            marginBottom: 50,
            textAlign: "center",
            fontFamily: "SoraRegular",
          }}
        >
          É hora de começar a sua jornada financeira.
        </Text>
        <InputLabel title="E-mail" />
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              maxLength={30}
              placeholder="Insira o E-mail"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.email && (
          <HelperText padding="none" type="error">
            Campo obrigatório
          </HelperText>
        )}
        <InputLabel title="Senha" />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              secureTextEntry
              maxLength={30}
              placeholder="Insira a Senha"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.password && (
          <HelperText padding="none" type="error">
            Campo obrigatório
          </HelperText>
        )}
        <SubmitButton children="Entrar" onPress={handleSubmit(onSignIn)} />
        <Text style={{ textAlign: "center", marginTop: 10 }}>CADASTRE-SE</Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
