import React from "react";
import { View, Text, ScrollView } from "react-native";
import Layout from "../../../components/Layout";
import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cashInDb } from "../../../services/db";
import dayjs from "dayjs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CashInList = () => {
  return (
    <Layout style={{ padding: 0 }}>
      <View style={styles.content}>
        <View style={styles.viewHeader}>
          <Ionicons name="person" size={40} color="grey" />
        </View>
        <Text style={styles.textNameHeader}>ADMIN</Text>
      </View>
      <ScrollView>
        {cashInDb?.map(({ name, date, value, category, cashRegisterType }) => {
          return (
            <View style={styles.carouselCard}>
              <View
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  marginRight: 5,
                  opacity: 0.5,
                }}
              >
                <MaterialCommunityIcons
                  name={
                    cashRegisterType === "cashIn" ? "cash-plus" : "cash-minus"
                  }
                  size={50}
                  color={cashRegisterType === "cashIn" ? "green" : "red"}
                />
              </View>
              <View
                style={{
                  width: 2,
                  backgroundColor: "#E5E5E5",
                  marginRight: 15,
                  borderRadius: 100,
                }}
              />
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    fontFamily: "Roboto_900Black",
                    letterSpacing: 0.2,
                    fontSize: 16,
                  }}
                >
                  {name}
                </Text>
                <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 17 }}>
                  R$ {value}
                </Text>
                <Text style={{ fontFamily: "Roboto_300Light" }}>
                  {category}
                </Text>
                <Text style={{ fontFamily: "Roboto_300Light" }}>
                  {dayjs(date).format("DD/MM/YYYY")}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </Layout>
  );
};

export default CashInList;
