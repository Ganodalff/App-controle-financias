import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    backgroundColor: "#F9F9F9",
    padding: 10,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  viewHeader: {
    width: 75,
    height: 75,
    backgroundColor: "lightgrey",
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  textNameHeader: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    fontFamily: "Roboto_400Regular",
  },
  goalCard: {
    flex: 1,
    display: "flex",
    marginTop: 10,
    backgroundColor: "#F9F9F9",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    padding: 15,
  },
  carouselCard: {
    padding: 15,
    backgroundColor: "#F9F9F9",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    margin: 5,
    flexDirection: "row",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
