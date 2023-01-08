import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  content: {
    padding: 0,
  },
  textHeader: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    textAlign: "center",
    fontFamily: "SoraRegular",
  },
});
