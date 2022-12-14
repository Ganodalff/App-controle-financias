import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { ScreensNavigatorParamList } from "../../../navigation";
import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import InputLabel from "../../../components/InputLabel";
import SubmitButton from "../../../components/Button";
import useGoal, { GoalType } from "../../../hooks/useGoal";
import useGoalMutation from "../../../hooks/useGoalMutation";
import { Controller, useForm } from "react-hook-form";
import { HelperText } from "react-native-paper";

type GoalProps = RouteProp<ScreensNavigatorParamList, "Goal">;

const Goal = () => {
  const {
    params: { id },
  } = useRoute<GoalProps>();
  const { data } = useGoal(id);
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: data?.name,
      value: data?.value,
      amount: data?.amount,
    },
  });

  const { mutateAsync: useGoalMutate, isLoading } = useGoalMutation();

  const saveGoal = async (data) => {
    try {
      useGoalMutate({ ...data, isActiveGoal: true });
      navigate("Dashboard");
    } catch (error) {}
  };

  const finishGoal = async (data) => {
    try {
      useGoalMutate({ ...data, isActiveGoal: false });
      navigate("Dashboard");
    } catch (error) {}
  };

  if (data)
    return (
      <Layout style={{ padding: 0 }}>
        <View style={styles.content}>
          <View style={styles.viewHeader}>
            <Ionicons name="person" size={40} color="grey" />
          </View>
          <Text style={styles.textNameHeader}>ADMIN</Text>
        </View>
        <View style={styles.goalCard}>
          <View style={{ margin: 10 }}>
            <InputLabel title="Nome do objetivo" />
            <Controller
              control={control}
              name="name"
              defaultValue={data.name}
              rules={{
                required: { message: "Campo é obrigatório", value: true },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  maxLength={30}
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
            <InputLabel title="Valor" />
            <Controller
              control={control}
              name="value"
              defaultValue={data.value}
              rules={{
                required: { message: "Campo é obrigatório", value: true },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={`${data?.value}`}
                  maxLength={7}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    fontFamily: "Roboto_400Regular",
                  }}
                  keyboardType="numeric"
                  error={!!errors.value}
                />
              )}
            />
            <HelperText type="error">{errors.value?.message}</HelperText>
            <InputLabel title="Já tenho" />
            <Controller
              control={control}
              name="amount"
              defaultValue={data.amount}
              rules={{
                required: { message: "Campo é obrigatório", value: true },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={`${data?.amount}`}
                  maxLength={7}
                  value={value}
                  onChangeText={onChange}
                  style={{
                    fontFamily: "Roboto_400Regular",
                  }}
                  keyboardType="numeric"
                  error={!!errors.amount}
                />
              )}
            />
            <HelperText type="error">{errors.amount?.message}</HelperText>
          </View>
          <SubmitButton
            loading={isLoading}
            children="Finalizar Meta"
            onPress={handleSubmit(finishGoal)}
          />
          <SubmitButton
            loading={isLoading}
            children="Salvar"
            style={{ marginTop: 20 }}
            onPress={handleSubmit(saveGoal)}
          />
          <SubmitButton
            children="Voltar"
            style={{ marginTop: 20, backgroundColor: "lightgray" }}
            onPress={() => {
              navigate("Dashboard");
            }}
          />
        </View>
      </Layout>
    );
};
export default Goal;

{
  /* <Controller
              control={control}
              name="name"
              defaultValue={data?.name}
              render={({ field: { onChange, value } }) => ()}/> */
}
