import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Dashboard from "../screens/Dashboard/Dashboard";
import Goal from "../screens/Dashboard/Goal/Goal";
import Login from "../screens/Login/Login";

export type ScreensNavigatorParamList = {
  Login: undefined;
  Dashboard: undefined;
  Goal: {
    id?: string;
  };
};

const AuthNavigatorStack =
  createNativeStackNavigator<ScreensNavigatorParamList>();

const AuthNavigatorScreens = () => {
  return (
    <AuthNavigatorStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <AuthNavigatorStack.Screen component={Login} name="Login" />
      <AuthNavigatorStack.Screen component={Dashboard} name="Dashboard" />
      <AuthNavigatorStack.Screen component={Goal} name="Goal" />
    </AuthNavigatorStack.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <AuthNavigatorScreens />
    </NavigationContainer>
  );
};

export default Routes;
