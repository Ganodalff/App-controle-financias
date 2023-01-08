import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import Layout from "../../components/Layout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import useGoals from "../../hooks/useGoals";
import dayjs from "dayjs";
import { cashInDb, cashOutDb } from "../../services/db";
import { useIsFocused } from "@react-navigation/native";
import useDeleteRecord from "../../hooks/useDeleteRecord";
import useAmount from "../../hooks/useAmount";

const Dashboard = () => {
  const isFocused = useIsFocused();
  const { data: goal, refetch: goalRefetech } = useGoals("?isActiveGoal=1");
  const { data: goals, refetch: goalsRefetech } = useGoals("?isActiveGoal=0");
  const { data: amount, refetch: amountRefetch } = useAmount();
  const { cashInAmount, cashOutAmount } = amount || {
    cashInAmount: 0,
    cashOutAmount: 0,
  };
  const { data: goalData } = goal || {};
  const { data: goalsData } = goals || {};
  const { navigate } = useNavigation();

  function refresh() {
    goalRefetech();
    goalsRefetech();
    amountRefetch();
  }

  useEffect(() => {
    refresh();
  }, [isFocused]);

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
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => navigate("CashInList")}
        >
          <Text
            style={{
              fontFamily: "SoraRegular",
              fontSize: 14,
            }}
          >
            Receitas R$:
          </Text>
          <Text
            style={{
              fontFamily: "SoraRegular",
              fontSize: 16,
            }}
          >
            {cashInAmount}
          </Text>
          <AntDesign name="arrowup" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => navigate("CashOutList")}
        >
          <Text
            style={{
              fontFamily: "SoraRegular",
              fontSize: 14,
            }}
          >
            Despesas R$:
          </Text>
          <Text
            style={{
              fontFamily: "SoraRegular",
              fontSize: 16,
            }}
          >
            {cashOutAmount}
          </Text>
          <AntDesign name="arrowdown" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={[styles.content]}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "SoraRegular",
            fontSize: 16,
          }}
        >
          Saldo Atual R$:
          {(cashInAmount - cashOutAmount).toFixed(2)}
        </Text>
      </View>
      <ScrollView>
        <TouchableOpacity
          disabled={goalData?.length ? true : false}
          onPress={() => navigate("Goal", 0)}
          style={[
            styles.content,
            {
              borderTopStartRadius: 30,
              borderTopEndRadius: 30,
              marginTop: 10,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "SoraRegular",
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
                  fontFamily: "SoraRegular",
                  fontSize: 16,
                }}
              >
                Meta da vez!
              </Text>
              {name && (
                <View style={{ marginLeft: 20, marginTop: 10 }}>
                  <Text style={{ fontSize: 24, fontFamily: "SoraRegular" }}>
                    {name}
                  </Text>
                  <Text style={{ fontSize: 17, fontFamily: "SoraRegular" }}>
                    R${value}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "SoraRegular",
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
                fontFamily: "SoraRegular",
                color: "darkgray",
                textAlign: "center",
              }}
            >
              Você ainda não concluiu nenhuma meta
            </Text>
          </View>
        )}
        {goalsData?.map(({ id, name, finalDate, value, amount }) => (
          <View style={styles.carouselCard}>
            <Text style={{ fontSize: 18, fontFamily: "SoraRegular" }}>
              Meta
            </Text>
            <Text style={{ fontSize: 22, fontFamily: "SoraRegular" }}>
              {name}
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginTop: 10,
                fontFamily: "SoraRegular",
              }}
            >
              Data de finalização da meta{" "}
              {dayjs(finalDate).format("DD/MM/YYYY")}
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginTop: 10,
                fontFamily: "SoraRegular",
              }}
            >
              Valor
            </Text>
            <Text style={{ fontSize: 18, fontFamily: "SoraRegular" }}>
              R$ {value}
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginTop: 10,
                fontFamily: "SoraRegular",
              }}
            >
              Valor Atingido
            </Text>
            <Text style={{ fontSize: 14, fontFamily: "SoraRegular" }}>
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
                  useDeleteRecord("goal", id);
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
