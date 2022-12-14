import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
  ViewProps,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

type LayoutProps = {
  children: string | React.ReactNode;
} & ViewProps;

const Layout = ({ children, ...props }: LayoutProps) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        flex: 1,
        height: "100%",
      }}
    >
      <StatusBar style="auto" />
      <ScrollView>
        <View {...props} style={[{ padding: 20 }, props.style]}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Layout;
