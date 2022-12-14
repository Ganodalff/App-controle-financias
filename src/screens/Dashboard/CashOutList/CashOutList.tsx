import React from "react";
import { View, Text, ScrollView } from "react-native";
import Layout from "../../../components/Layout";
import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";

import dayjs from "dayjs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useBalances from "../../../hooks/useBalances";

const CashOutList = () => {
  const { data } = useBalances("?cash=cash_out");
  const { data: cashOut } = data || {};
  return (
    <Layout style={{ padding: 0 }}>
      <View style={styles.content}>
        <View style={styles.viewHeader}>
          <Ionicons name="person" size={40} color="grey" />
        </View>
        <Text style={styles.textNameHeader}>ADMIN</Text>
      </View>
      <ScrollView>
        {cashOut?.map(({ name, category, cash_out, created_at }) => {
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
                  name="cash-minus"
                  size={50}
                  color="red"
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
                    fontFamily: "SoraRegular",
                    letterSpacing: 0.2,
                    fontSize: 16,
                  }}
                >
                  {name}
                </Text>
                <Text style={{ fontFamily: "SoraRegular", fontSize: 17 }}>
                  R$ {cash_out}
                </Text>
                <Text style={{ fontFamily: "SoraRegular" }}>
                  {category}
                </Text>
                <Text style={{ fontFamily: "SoraRegular" }}>
                  {dayjs(created_at).format("DD/MM/YYYY")}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </Layout>
  );
};

export default CashOutList;
