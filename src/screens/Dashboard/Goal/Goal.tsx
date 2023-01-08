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
import useGoal from "../../../hooks/useGoal";
import useGoalMutation from "../../../hooks/useGoalMutation";
import { Controller, useForm } from "react-hook-form";
import { HelperText } from "react-native-paper";

type GoalProps = RouteProp<ScreensNavigatorParamList, "Goal">;

const Goal = () => {
  const {
    params: { id },
  } = useRoute<GoalProps>();
  const { data, isLoading } = useGoal(id);
  const { navigate } = useNavigation();
  const { mutateAsync: useGoalMutate } = useGoalMutation();
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

  const saveGoal = async (data) => {
    try {
      await useGoalMutate({ ...data, isActiveGoal: true });
      navigate("Dashboard");
    } catch (error) {}
  };

  const finishGoal = async (data) => {
    try {
      await useGoalMutate({ ...data, isActiveGoal: false });
      navigate("Dashboard");
    } catch (error) {}
  };
  if (!isLoading)
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
              defaultValue={data?.name}
              control={control}
              name="name"
              rules={{
                required: { message: "Campo é obrigatório", value: true },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  defaultValue={data?.name}
                  maxLength={30}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    fontFamily: "SoraRegular",
                  }}
                  error={!!errors.name}
                />
              )}
            />
            <HelperText type="error">{errors.name?.message}</HelperText>
            <InputLabel title="Valor" />
            <Controller
              defaultValue={data?.value}
              control={control}
              name="value"
              rules={{
                required: { message: "Campo é obrigatório", value: true },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  defaultValue={data?.value?.toString()}
                  maxLength={7}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    fontFamily: "SoraRegular",
                  }}
                  keyboardType="numeric"
                  error={!!errors.value}
                />
              )}
            />
            <HelperText type="error">{errors.value?.message}</HelperText>
            <InputLabel title="Já tenho" />
            <Controller
              defaultValue={data?.amount}
              control={control}
              name="amount"
              rules={{
                required: { message: "Campo é obrigatório", value: true },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  style={{
                    borderRadius: 8,
                    backgroundColor: "#f4f4f4",
                  }}
                  defaultValue={data?.amount?.toString()}
                  maxLength={12}
                  value={value}
                  onChangeText={onChange}
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
