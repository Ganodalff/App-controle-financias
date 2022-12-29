import React from "react";
import { View, Text } from "react-native";
import Layout from "../../../components/Layout";
import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import InputLabel from "../../../components/InputLabel";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../components/Input";
import { HelperText, RadioButton } from "react-native-paper";
import SubmitButton from "../../../components/Button";
import { CashDbType, cashInDb, cashOutDb } from "../../../services/db";
import { useNavigation } from "@react-navigation/native";
import { Slider } from "@miblanchard/react-native-slider";

const CashRegister = () => {
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      value: "",
      category: "",
      cashRegisterType: "cashIn",
    },
  });

  const saveCashRegister = async (data: CashDbType) => {
    if (data.cashRegisterType === "cashIn") {
      cashInDb.push({
        ...data,
        date: new Date(),
      });
      return navigate("Dashboard");
    }
    cashOutDb.push({ ...data, date: new Date() });
    return navigate("Dashboard");
  };

  return (
    <Layout visible={true} style={{ padding: 0 }}>
      <View style={styles.content}>
        <View style={styles.viewHeader}>
          <Ionicons name="person" size={40} color="grey" />
        </View>
        <Text style={styles.textNameHeader}>ADMIN</Text>
      </View>
      <View style={styles.goalCard}>
        <View style={{ margin: 10 }}>
          <InputLabel title="Nome do lançamento" />
          <Controller
            control={control}
            name="name"
            rules={{
              required: { message: "Campo é obrigatório", value: true },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome do lançamento"
                maxLength={50}
                onChangeText={onChange}
                value={value}
                style={{
                  fontFamily: "Roboto_400Regular",
                }}
                error={!!errors.name}
              />
            )}
          />
          <HelperText type="error">{errors.name?.message}</HelperText>
          <InputLabel title="Valor R$" />
          <Controller
            control={control}
            name="value"
            rules={{
              required: { message: "Campo é obrigatório", value: true },
            }}
            render={({ field: { onChange, value } }) => (
              <View>
                <Slider
                  minimumTrackTintColor="orange"
                  step={1}
                  trackClickable={true}
                  minimumValue={0}
                  maximumValue={5000}
                  onValueChange={(value) => {
                    onChange(value);
                  }}
                  value={value}
                />
                <Input
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                  defaultValue={value.toString()}
                  maxLength={5}
                />
              </View>
            )}
          />
          <HelperText type="error">{errors.value?.message}</HelperText>
          <InputLabel title="Categoria" />
          <Controller
            control={control}
            name="category"
            rules={{
              required: { message: "Campo é obrigatório", value: true },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Categoria"
                maxLength={50}
                onChangeText={onChange}
                value={value}
                style={{
                  fontFamily: "Roboto_400Regular",
                }}
                error={!!errors.category}
              />
            )}
          />
          <HelperText type="error">{errors.category?.message}</HelperText>
          <View style={{ marginTop: 10 }}>
            <Controller
              defaultValue={"cashIn"}
              control={control}
              name="cashRegisterType"
              rules={{
                required: { message: "Campo é obrigatório", value: true },
              }}
              render={({ field: { onChange, value } }) => (
                <RadioButton.Group
                  onValueChange={(value) => {
                    onChange(value);
                  }}
                  value={value}
                >
                  <RadioButton.Item
                    label="Entrada"
                    value="cashIn"
                    color="green"
                  />
                  <RadioButton.Item label="Saída" value="cashOut" color="red" />
                </RadioButton.Group>
              )}
            />
          </View>
          <SubmitButton
            children={"Cadastrar"}
            onPress={handleSubmit(saveCashRegister)}
          ></SubmitButton>
        </View>
      </View>
    </Layout>
  );
};

export default CashRegister;
