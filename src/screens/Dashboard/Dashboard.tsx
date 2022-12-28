import { useIsFocused, useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import Layout from "../../components/Layout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import useGoals from "../../hooks/useGoals";
import dayjs from "dayjs";

import useDeleteRecord from "../../hooks/useDeleteRecord";

const Dashboard = () => {
  const { data: goal, refetch: goalRefetech } = useGoals("?isActiveGoal=1");
  const { data: goals, refetch: goalsRefetech } = useGoals("?isActiveGoal=0");
  const { data: goalData } = goal || {};
  const { data: goalsData } = goals || {};
  const { navigate } = useNavigation();
  const isFocused = useIsFocused();

  if (isFocused) refresh();

  function refresh() {
    goalRefetech();
    goalsRefetech();
  }

  return (
    <Layout style={{ padding: 0 }}>
      <View style={styles.content}>
        <View style={styles.viewHeader}>
          <Ionicons name="person" size={40} color="grey" />
        </View>
        <Text style={styles.textNameHeader}>ADMIN</Text>
      </View>
      <View
        style={[
          styles.content,
          {
            marginTop: 10,
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
            borderBottomStartRadius: 0,
            borderBottomEndRadius: 0,
          },
        ]}
      >
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "Roboto_300Light",
              fontSize: 14,
            }}
          >
            Receitas R$:
          </Text>
          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              fontSize: 16,
            }}
          >
            {/* {parseFloat(balance.cashInput) ? balance.cashInput : "0"} */}
          </Text>
          <AntDesign name="arrowup" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "Roboto_300Light",
              fontSize: 14,
            }}
          >
            Despesas R$:
          </Text>
          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              fontSize: 16,
            }}
          >
            {/* {parseFloat(balance.cashOutput) ? balance.cashOutput : "0"} */}
          </Text>
          <AntDesign name="arrowdown" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={[styles.content]}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Roboto_300Light",
            fontSize: 16,
          }}
        >
          Saldo Atual R$:
        </Text>
      </View>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigate("Goal", 0)}
          style={[
            styles.content,
            { borderTopStartRadius: 30, borderTopEndRadius: 30, marginTop: 10 },
          ]}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Roboto_300Light",
              color: "darkgray",
              textAlign: "center",
            }}
          >
            Cadastrar nova meta
          </Text>
        </TouchableOpacity>
        {goalData?.map(({ id, name, value, amount }) => (
          <TouchableOpacity
            onPress={() => {
              navigate("Goal", { id: id });
            }}
          >
            <View style={styles.goalCard}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Roboto_400Regular",
                  fontSize: 16,
                }}
              >
                Meta da vez!
              </Text>
              {name && (
                <View style={{ marginLeft: 20, marginTop: 10 }}>
                  <Text
                    style={{ fontSize: 24, fontFamily: "Roboto_400Regular" }}
                  >
                    {name}
                  </Text>
                  <Text
                    style={{ fontSize: 17, fontFamily: "Roboto_400Regular" }}
                  >
                    R${value}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Roboto_400Regular",
                      color: "green",
                    }}
                  >
                    Já tenho: R${amount}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView horizontal={true}>
        {!goalsData?.length && (
          <View style={styles.carouselCard}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Roboto_300Light",
                color: "darkgray",
                textAlign: "center",
              }}
            >
              Você ainda não concluiu nenhuma meta
            </Text>
          </View>
        )}
        {goalsData?.map(({ id, name, final_date, value, amount }) => (
          <View style={styles.carouselCard}>
            <Text style={{ fontSize: 18, fontFamily: "Roboto_300Light" }}>
              Meta
            </Text>
            <Text style={{ fontSize: 22, fontFamily: "Roboto_400Regular" }}>
              {name}
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginTop: 10,
                fontFamily: "Roboto_300Light",
              }}
            >
              Data de finalização da meta{" "}
              {dayjs(final_date).format("DD/MM/YYYY")}
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginTop: 10,
                fontFamily: "Roboto_300Light",
              }}
            >
              Valor
            </Text>
            <Text style={{ fontSize: 18, fontFamily: "Roboto_400Regular" }}>
              R$ {value}
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginTop: 10,
                fontFamily: "Roboto_300Light",
              }}
            >
              Valor Atingido
            </Text>
            <Text style={{ fontSize: 14, fontFamily: "Roboto_400Regular" }}>
              R$ {amount}
            </Text>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={async () => {
                  await useDeleteRecord("goal", id);
                  refresh();
                }}
              >
                <AntDesign name="closecircleo" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
};

export default Dashboard;
