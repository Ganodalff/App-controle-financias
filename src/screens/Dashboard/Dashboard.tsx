import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import Layout from "../../components/Layout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import useGoals from "../../hooks/useGoals";
import dayjs from "dayjs";
import { cashInDb, cashOutDb } from "../../services/db";
import { useIsFocused } from "@react-navigation/native";

const Dashboard = () => {
  const isFocused = useIsFocused();
  const { data, refetch: goalRefetech } = useGoals("?isActiveGoal=1");
  const { data: goalCurrentData } = data || {};
  const { navigate } = useNavigation();
  const { data: goals, refetch: goalsRefetech } = useGoals("?isActiveGoal=0");
  const { data: goalsData } = goals || {};
  const [refreshing] = useState(false);
  const [totalCashIn, setTotalCashIn] = useState(0);
  const [totalCashOut, setTotalCashOut] = useState(0);

  useEffect(() => {
    const cashOut = cashOutDb.reduce((accumulator, obj) => {
      return accumulator + parseFloat(obj.value);
    }, 0);

    const cashIn = cashInDb.reduce((accumulator, obj) => {
      return accumulator + parseFloat(obj.value);
    }, 0);
    setTotalCashIn(cashIn), setTotalCashOut(cashOut);
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
            {totalCashIn}
          </Text>
          <AntDesign name="arrowup" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => navigate("CashOutList")}
        >
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
            {totalCashOut}
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
          Saldo Atual R$: {totalCashIn - totalCashOut}
        </Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={goalRefetech} />
        }
      >
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
        {goalCurrentData?.map(({ id, name, value, amount }) => (
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
      <ScrollView
        horizontal={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={goalsRefetech} />
        }
      >
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
        {goalsData?.map(({ name, finalDate, value, amount }) => (
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
              {dayjs(finalDate).format("DD/MM/YYYY")}
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
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
};

export default Dashboard;
