import { ScrollView, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type LayoutProps = {
  children: string | React.ReactNode;
  visible?: boolean;
} & ViewProps;

const Layout = ({ children, visible, ...props }: LayoutProps) => {
  const { navigate } = useNavigation();
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
        <View
          {...props}
          style={[{ padding: 20, marginBottom: 10 }, props.style]}
        >
          {children}
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          paddingLeft:20,
          paddingRight:20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigate("Dashboard");
          }}
        >
          <AntDesign name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("CashRegister")}
          disabled={visible}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              backgroundColor: "orange",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="plus" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate("Home");
          }}
        >
          <AntDesign name="linechart" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Layout;
